import express from "express";
import userRoutes from "./routes/user.routes.js";
import todoRoutes from "./routes/todo.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import cors from "cors";

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Proper CORS setup
app.use(cors({
    origin: "http://localhost:5173", // React frontend port
    credentials: true               // Allow cookies or Authorization headers
}));

// Routes
app.use("/api/auth", userRoutes);
app.use("/api/todo", todoRoutes);
app.use("/api/admin", adminRoutes);

// Error-handling middleware
app.use((err, req, res, next) => {
    console.error(err);
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Something went wrong';

    res.status(statusCode).json({
        message,
        statusCode
    });
});

export default app;
