// src/components/AdminDashboard.jsx
import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="flex flex-col w-1/4 bg-blue-500 text-white p-4">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        <ul className="space-y-4">
          <li>
            <Link to="/todos" className="hover:text-blue-200">View All Todos</Link>
          </li>
          <li>
            <Link to="/admin/users" className="hover:text-blue-200">Manage Users</Link>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="ml-1/4 p-6">
        <h2 className="text-3xl font-semibold mb-6">Admin Dashboard</h2>
        <p>Welcome, admin! Choose a section to manage.</p>
      </div>
    </div>
  );
};

export default AdminDashboard;
