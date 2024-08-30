import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const AddTodo = ({ setTodos }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [targetDate, setTargetDate] = useState("");
  const [showForm, setShowForm] = useState(false);

  const handleAddTodo = async (e) => {
    e.preventDefault();
    try {
      const user = JSON.parse(localStorage.getItem("token"));
      const userId = user ? user.userId : null;

      if (!userId) {
        throw new Error("User ID is not available.");
      }

      const response = await axios.post(
        "https://localhost:7047/api/v1/todos",
        {
          title,
          description,
          userId,
          targetDate: new Date(targetDate),
          todoStatus: 0,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setTodos((prev) => [...prev, response.data]);
      setTitle("");
      setDescription("");
      setTargetDate("");
      setShowForm(false);
    } catch (error) {
      console.error("Error adding todo", error);
    }
  };

  return (
    <Container className="mt-4">
      <Button variant="primary" onClick={() => setShowForm(!showForm)}>
        {showForm ? "Cancel" : "Create Todo"}
      </Button>
      {showForm && (
        <Form onSubmit={handleAddTodo} className="mt-3">
          <Form.Group controlId="formTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formTargetDate">
            <Form.Label>Target Date</Form.Label>
            <Form.Control
              type="date"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-3">
            Add Todo
          </Button>
        </Form>
      )}
    </Container>
  );
};

export default AddTodo;
