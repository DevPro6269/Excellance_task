import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const TodoPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [category, setCategory] = useState("Urgent");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Basic validation
    if (!title || title.length > 100) {
      setError("Title is required and must be under 100 characters.");
      return;
    }
  
    if (description.length > 500) {
      setError("Description must be under 500 characters.");
      return;
    }
  
    setError("");
    setMessage("");
  
    // ✅ Get token from localStorage
    const token = sessionStorage.getItem("token");
  
    try {
      const res = await axios.post(
        "http://localhost:8080/api/todo",
        {
          title,
          description,
          dueDate,
          category,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      setMessage("Todo created successfully!");
      setTitle("");
      setDescription("");
      setDueDate("");
      setCategory("Urgent");
  
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.message || "Failed to create todo";
      setError(msg);
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">

<Link
  to="/todos"
  className="inline-block mt-4 text-blue-500 hover:text-blue-700 underline"
>
  View All Todos →
</Link>

      <div className="bg-white p-8 rounded shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Create a New Todo</h2>
    
        {message && <p className="text-green-600 mb-4">{message}</p>}
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          {/* Title */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Title <span className="text-red-500">*</span></label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={100}
              required
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter todo title"
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={500}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter a description "
              rows={3}
            ></textarea>
          </div>

          {/* Due Date */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Due Date</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Category */}
          <div className="mb-6">
            <label className="block text-gray-700 mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Urgent">Urgent</option>
              <option value="Not-Urgent">Not-Urgent</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition"
          >
            Create Todo
          </button>
        </form>
      </div>
    </div>
  );
};

export default TodoPage;
