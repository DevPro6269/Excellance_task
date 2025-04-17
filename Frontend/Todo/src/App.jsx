import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SignInPage from "./components/Signup";
import LoginPage from "./components/Login";
import TodoPage from "./components/TodoPage";
import ProtectedRoute from "./components/ProtectedRoute";
import AllTodosPage from "./components/AllTodoPage";
import AdminDashboard from "./components/AdminDashboard";
import AdminUserManagementPage from "./components/AdminUserManagementPage";


function App() {
  return (
    <Router>
      <Routes>

        {/* Redirect root to /login */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Public routes */}
        <Route path="/signup" element={<SignInPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Protected route */}
        <Route
          path="/todo"
          element={
            <ProtectedRoute>
              <TodoPage />
            </ProtectedRoute>
          }
        />

<Route
  path="/todos"
  element={
   
      <AllTodosPage />
   
  }
/>
<Route
  path="/admin/users"
  element={
    <ProtectedRoute>
      <AdminUserManagementPage/>
    </ProtectedRoute>
  }
/>
<Route
  path="/admin"
  element={
      <AdminDashboard />
  }
/>


        {/* Optional: Catch-all */}
        <Route path="*" element={<h1 className="text-center mt-10 text-2xl">404 - Page Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
