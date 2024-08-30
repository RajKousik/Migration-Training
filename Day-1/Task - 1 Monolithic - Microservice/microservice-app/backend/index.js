// backend/index.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const PORT = 8000;

// Middleware
app.use(cors());
app.use(express.json());

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

// User Routes
app.use("/api/users", require("./routes/user"));

app.get("/", (req, res) => {
  console.log("GET Method");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
