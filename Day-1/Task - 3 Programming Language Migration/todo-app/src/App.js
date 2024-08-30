import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";
import Login from "./components/Login";
import Register from "./components/Register";
import TodoList from "./components/TodoList";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  const [todos, setTodos] = useState([]);

  // Fetch todos from the backend
  const fetchTodos = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("token"));
      const userId = user ? user.userId : null;
      const response = await axios.get(
        `https://localhost:7047/api/v1/todos/user/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/todos"
          element={
            <PrivateRoute>
              <TodoList todos={todos} setTodos={setTodos} />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
