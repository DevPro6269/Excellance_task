
import User from "../models/user.model.js";
import Todo from "../models/todo.model.js";

export async function getAllUsers(req, res) {
    const { user } = req;

    if (!user) {
        return res.status(401).json({ message: "Unauthorized: User not found in request" });
    }

    if (user.role !== "Admin") {
        return res.status(403).json({ message: "Forbidden: Only admins can view all users" });
    }

    try {
        const users = await User.find().select('-password'); 

        if (users.length === 0) {
            return res.status(404).json({ message: "No users found" });
        }

        return res.status(200).json({
            message: "Users fetched successfully",
            data: users
        });

    } catch (err) {
        console.error("Error fetching users:", err);
        return res.status(500).json({ message: "Internal server error", error: err.message });
    }
}

export async function updateUserRole(req, res) {
    const { user } = req; 
    const { id } = req.params; 
    const { role } = req.body; 

    
    if (!user || user.role !== "Admin") {
        return res.status(403).json({ message: "Forbidden: Only admins can update roles" });
    }

    // Validate the role
    const validRoles = ["User", "Admin"]; // Add more roles if necessary
    if (!validRoles.includes(role)) {
        return res.status(400).json({ message: "Invalid role. Valid roles are 'User' and 'Admin'." });
    }

    try {
        // Find the user to update
        const userToUpdate = await User.findById(id);
        if (!userToUpdate) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update the role
        userToUpdate.role = role;
        const updatedUser = await userToUpdate.save();

        return res.status(200).json({
            message: "User role updated successfully",
            data: updatedUser
        });

    } catch (err) {
        console.error("Error updating user role:", err);
        return res.status(500).json({ message: "Internal server error", error: err.message });
    }
}

export async function getAllTodos(req, res) {
    const { user } = req;

    if (!user) {
        return res.status(401).json({ message: "Unauthorized: User not found in request" });
    }

    // Check if the user is an admin
    if (user.role !== "Admin") {
        return res.status(403).json({ message: "Forbidden: Only admins can view all todos" });
    }

    try {
        const todos = await Todo.find();

        if (todos.length === 0) {
            return res.status(404).json({ message: "No todos found" });
        }

        return res.status(200).json({
            message: "Todos fetched successfully",
            data: todos
        });

    } catch (err) {
        console.error("Error fetching todos:", err);
        return res.status(500).json({ message: "Internal server error", error: err.message });
    }
}
