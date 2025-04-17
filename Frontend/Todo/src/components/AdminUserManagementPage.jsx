// src/components/AdminUserManagementPage.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminUserManagementPage = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/admin/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(res.data.data || []);
      } catch (err) {
        setError("Failed to fetch users.");
      }
    };

    fetchUsers();
  }, [token]);

  // Handle role change (toggle between "admin" and "user")
  const handleRoleChange = async (userId, currentRole) => {
    try {
      const newRole = currentRole === "admin" ? "user" : "admin";
      const res = await axios.patch(
        `http://localhost:8080/api/admin/users/${userId}/role`,
        { role: newRole },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSuccess(`User role updated to ${newRole}`);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, role: newRole } : user
        )
      );
    } catch (err) {
      setError("Failed to update user role.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage User Roles</h1>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}

      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <ul className="space-y-4">
          {users.map((user) => (
            <li key={user._id} className="p-4 border rounded shadow">
              <h2 className="font-semibold">{user.name}</h2>
              <p>Email: {user.email}</p>
              <p>Current Role: {user.role}</p>
              <button
                onClick={() => handleRoleChange(user._id, user.role)}
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
              >
                Change Role to {user.role === "admin" ? "User" : "Admin"}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminUserManagementPage;
