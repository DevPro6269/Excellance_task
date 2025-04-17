import React, { useEffect, useState } from "react";
import axios from "axios";

const AllTodosPage = () => {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ title: "", description: "" });

  const token = sessionStorage.getItem("token");

  useEffect(() => {
    fetchTodos();
  }, [token]);

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

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/todo/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTodos(todos.filter((todo) => todo._id !== id));
      alert("todo deleted successfully")
    } catch (err) {
      alert("Error deleting todo.");
    }
  };

  const handleEditClick = (todo) => {
    setEditingId(todo._id);
    setEditForm({ title: todo.title, description: todo.description });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (id) => {
    try {
      const res = await axios.put(
        `http://localhost:8080/api/todo/${id}`,
        {
          title: editForm.title,
          description: editForm.description,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("todo edited successfully")
      setTodos(
        todos.map((todo) => (todo._id === id ? res.data.data : todo))
      );
      setEditingId(null);
    } catch (err) {
      alert("Failed to update todo.");
    }
  };

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
              {editingId === todo._id ? (
                <>
                  <input
                    type="text"
                    name="title"
                    value={editForm.title}
                    onChange={handleEditChange}
                    className="block w-full mb-2 p-2 border rounded"
                  />
                  <textarea
                    name="description"
                    value={editForm.description}
                    onChange={handleEditChange}
                    className="block w-full mb-2 p-2 border rounded"
                  />
                  <button
                    onClick={() => handleEditSubmit(todo._id)}
                    className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="bg-gray-300 text-black px-3 py-1 rounded"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <h2 className="font-semibold">{todo.title}</h2>
                  <p>{todo.description}</p>
                  <p className="text-sm text-gray-600">
                    Category: {todo.category} | Due:{" "}
                    {todo.dueDate ? new Date(todo.dueDate).toLocaleDateString() : "N/A"}
                  </p>
                  <div className="mt-2 space-x-2">
                    <button
                      onClick={() => handleEditClick(todo)}
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(todo._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AllTodosPage;
