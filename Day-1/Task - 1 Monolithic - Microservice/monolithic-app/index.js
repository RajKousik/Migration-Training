const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path"); // To handle file paths
const app = express();
const PORT = 5000;

// Import User model
const User = require("./models/user");

// Middleware
app.use(cors());
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

// Set EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); // Set the views directory

// MongoDB Connection
mongoose
  .connect(
    "mongodb+srv://rajkousik20:RajKousik@cluster0.gpl8uqx.mongodb.net/UsersDB",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error: ", err));

// Home Route
app.get("/", async (req, res) => {
  try {
    const users = await User.find(); // Assuming 'Item' was meant to be 'User'
    res.render("index", { users });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post("/", async (req, res) => {
  const user = new User({
    name: req.body.name,
  });

  try {
    const newUser = await user.save();
    res.redirect("/"); // Redirect to home page after adding a user
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
