// src/components/AllTodosPage.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";

const AllTodosPage = () => {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState("");

  const token = sessionStorage.getItem("token");

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/todo", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setTodos(res.data.data || []);
      } catch (err) {
        const msg = err.response?.data?.message || "Failed to fetch todos";
        setError(msg);
      }
    };

    fetchTodos();
  }, [token]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Todos</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {todos.length === 0 ? (
        <p>No todos found.</p>
      ) : (
        <ul className="space-y-4">
          {todos.map((todo) => (
            <li key={todo._id} className="p-4 border rounded shadow">
              <h2 className="font-semibold">{todo.title}</h2>
              <p>{todo.description}</p>
              <p className="text-sm text-gray-600">
                Category: {todo.category} | Due:{" "}
                {todo.dueDate ? new Date(todo.dueDate).toLocaleDateString() : "N/A"}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AllTodosPage;
