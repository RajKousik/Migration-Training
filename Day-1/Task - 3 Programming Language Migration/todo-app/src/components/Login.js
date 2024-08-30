import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import "./LoginRegister.css"; // Add custom CSS

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://localhost:7047/api/v1/users/login",
        { userName, password }
      );
      localStorage.setItem("token", JSON.stringify(response.data));
      navigate("/todos");
    } catch (error) {
      setError("Invalid login credentials");
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="mb-4 text-center">Login</h2>
      <Form onSubmit={handleLogin} className="login-form">
        <Form.Group controlId="formUserName">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formPassword" className="mt-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3">
          Login
        </Button>
        {error && (
          <Alert variant="danger" className="mt-3">
            {error}
          </Alert>
        )}
        <div className="mt-3 text-center">
          <span>Don't have an account? </span>
          <Link to="/register">Register here</Link>
        </div>
      </Form>
    </Container>
  );
};

export default Login;
