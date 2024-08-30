import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import "./LoginRegister.css"; // Add custom CSS

const Register = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://localhost:7047/api/v1/users/register", user);
      navigate("/login");
    } catch (error) {
      setError("Registration failed");
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="mb-4 text-center">Register</h2>
      <Form onSubmit={handleRegister} className="register-form">
        <Form.Group controlId="formFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter first name"
            value={user.firstName}
            onChange={(e) => setUser({ ...user, firstName: e.target.value })}
            required
          />
        </Form.Group>
        <Form.Group controlId="formLastName" className="mt-3">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter last name"
            value={user.lastName}
            onChange={(e) => setUser({ ...user, lastName: e.target.value })}
            required
          />
        </Form.Group>
        <Form.Group controlId="formUserName" className="mt-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={user.userName}
            onChange={(e) => setUser({ ...user, userName: e.target.value })}
            required
          />
        </Form.Group>
        <Form.Group controlId="formPassword" className="mt-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3">
          Register
        </Button>
        {error && (
          <Alert variant="danger" className="mt-3">
            {error}
          </Alert>
        )}
        <div className="mt-3 text-center">
          <span>Already have an account? </span>
          <Link to="/login">Login here</Link>
        </div>
      </Form>
    </Container>
  );
};

export default Register;
