import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    setError("");
    setMessage("");

    try {
      const res = await axios.post("http://localhost:8080/api/auth/login", {
        email,
        password,
      });
      sessionStorage.setItem("role",res.data.data.role)
      const role = res.data?.data?.role
      console.log(res.data.data.token)
      // Save token to localStorage
      if (res.data.data.token) {
        sessionStorage.setItem("token",res.data?.data?.token)
        sessionStorage.setItem("role",role)
      }
      

      setMessage("Login successful!");
       alert("login successfully")
      if(role=="Admin"){
        
        navigate("/admin");
      }else{
        navigate("/todo");
      }

    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.message || "Login failed";
      setError(msg);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        {message && <p className="text-green-600 mb-4">{message}</p>}
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleLogin}>
          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          Don’t have an account?{" "}
          <a href="/signup" className="text-blue-500 hover:text-blue-600">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
