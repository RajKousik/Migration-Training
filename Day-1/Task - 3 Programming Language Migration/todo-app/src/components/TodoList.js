import React, { useState } from "react";
import axios from "axios";
import { Container, Card, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import AddTodo from "./AddTodo"; // Import the AddTodo component
import Navbar from "./Navbar"; // Import the Navbar component
import "./TodoList.css"; // Add custom CSS

const TodoList = ({ todos, setTodos }) => {
  const [editingTodo, setEditingTodo] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [targetDate, setTargetDate] = useState("");
  const [showAddTodo, setShowAddTodo] = useState(false); // State to manage AddTodo form visibility

  const updateTodoStatus = async (todo) => {
    try {
      await axios.put(
        `https://localhost:7047/api/v1/todos/${todo.todoId}`,
        { ...todo, todoStatus: todo.todoStatus === 1 ? 0 : 1 },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setTodos(
        todos.map((item) =>
          item.todoId === todo.todoId
            ? { ...item, todoStatus: item.todoStatus === 1 ? 0 : 1 }
            : item
        )
      );
    } catch (error) {
      console.error("Error updating todo status", error);
    }
  };

  const handleUpdateTodo = async (e) => {
    e.preventDefault();
    if (editingTodo) {
      try {
        await axios.put(
          `https://localhost:7047/api/v1/todos/${editingTodo.todoId}`,
          {
            ...editingTodo,
            title,
            description,
            targetDate: new Date(targetDate),
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setTodos(
          todos.map((todo) =>
            todo.todoId === editingTodo.todoId
              ? {
                  ...todo,
                  title,
                  description,
                  targetDate: new Date(targetDate),
                }
              : todo
          )
        );
        setEditingTodo(null);
        setTitle("");
        setDescription("");
        setTargetDate("");
      } catch (error) {
        console.error("Error updating todo", error);
      }
    }
  };

  const deleteTodo = async (todoId) => {
    try {
      await axios.delete(`https://localhost:7047/api/v1/todos/${todoId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setTodos(todos.filter((todo) => todo.todoId !== todoId));
    } catch (error) {
      console.error("Error deleting todo", error);
    }
  };

  const startEdit = (todo) => {
    setEditingTodo(todo);
    setTitle(todo.title);
    setDescription(todo.description);
    setTargetDate(new Date(todo.targetDate).toISOString().split("T")[0]);
  };

  return (
    <Container className="todo-container mt-4">
      <Navbar />
      <h2 className="mb-4">Todos</h2>
      {!showAddTodo && (
        <Button
          variant="primary"
          className="mb-4"
          onClick={() => setShowAddTodo(!showAddTodo)} // Toggle AddTodo form visibility
        >
          {showAddTodo ? "Cancel" : "Create Todo"}
        </Button>
      )}
      {showAddTodo && <AddTodo setTodos={setTodos} />}{" "}
      {/* Conditional rendering of AddTodo */}
      {todos.map((todo) => (
        <Card
          key={todo.todoId}
          className={`mb-3 mt-3 ${
            todo.todoStatus === 1 ? "completed-todo" : ""
          }`} // Apply class based on status
        >
          <Card.Body>
            <Card.Title>{todo.title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              Due: {new Date(todo.targetDate).toLocaleDateString()}
            </Card.Subtitle>
            <Card.Text>{todo.description}</Card.Text>
            <Button
              variant={todo.todoStatus === 1 ? "secondary" : "success"}
              onClick={() => updateTodoStatus(todo)}
            >
              {todo.todoStatus === 1
                ? "Mark as Not Completed"
                : "Mark as Complete"}
            </Button>
            <Button
              variant="warning"
              className="mx-3"
              onClick={() => startEdit(todo)}
            >
              Edit
            </Button>
            <Button
              variant="danger"
              className="ml-2"
              onClick={() => deleteTodo(todo.todoId)}
            >
              Delete
            </Button>
          </Card.Body>
        </Card>
      ))}
      {editingTodo && (
        <Form onSubmit={handleUpdateTodo} className="mt-4">
          <h3>Edit Todo</h3>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Target Date</Form.Label>
            <Form.Control
              type="date"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              required
            />
          </Form.Group>
          <Button type="submit" variant="primary">
            Update Todo
          </Button>
          <Button
            variant="secondary"
            className="mx-3"
            onClick={() => setEditingTodo(null)}
          >
            Cancel
          </Button>
        </Form>
      )}
    </Container>
  );
};

export default TodoList;
