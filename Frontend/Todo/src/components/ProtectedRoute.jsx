import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = sessionStorage.getItem('token');
  const role = sessionStorage.getItem("role")
  if (!token) {
    return <Navigate to="/login" replace />;
  }
   
  return children;
};

export default ProtectedRoute;
