import React, { useState } from "react";
import axios from "axios";

const TodoItem = ({ todo, setTodos }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);
  const [targetDate, setTargetDate] = useState(todo.targetDate.split("T")[0]);

  const handleDelete = async () => {
    await axios.delete(`https://localhost:7047/api/v1/todos/${todo.todoId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    setTodos((prev) => prev.filter((t) => t.todoId !== todo.todoId));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedTodo = {
      title,
      description,
      targetDate: new Date(targetDate),
      todoStatus: todo.todoStatus,
    };
    const response = await axios.put(
      `https://localhost:7047/api/v1/todos/${todo.todoId}`,
      updatedTodo,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    setTodos((prev) =>
      prev.map((t) => (t.todoId === todo.todoId ? response.data : t))
    );
    setIsEditing(false);
  };

  return (
    <li>
      {isEditing ? (
        <form onSubmit={handleUpdate}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <input
            type="date"
            value={targetDate}
            onChange={(e) => setTargetDate(e.target.value)}
            required
          />
          <button type="submit">Save</button>
        </form>
      ) : (
        <>
          <span>{todo.title}</span>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </>
      )}
    </li>
  );
};

export default TodoItem;
