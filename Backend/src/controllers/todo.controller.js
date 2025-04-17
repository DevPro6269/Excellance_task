import Todo from "../models/todo.model.js"
import User from "../models/user.model.js"
import Joi from 'joi';

const todoSchema = Joi.object({
    title: Joi.string().max(100).required(),
    description: Joi.string().max(500).optional().allow(''),
    dueDate: Joi.date().optional().allow(null, ''),
    category: Joi.string().valid("Urgent", "Non-Urgent").required()
});

const updateTodoSchema = Joi.object({
    title: Joi.string().max(100).required(),
    description: Joi.string().max(500).optional().allow(''),
    dueDate: Joi.date().optional().allow(null, '')
});



export async function getTodos(req, res) {
  const { user } = req;

  if (!user) {
    return res.status(401).json({ message: "Unauthorized: No user found in the request" });
  }

  try {
    if (user.role === "Admin") {
      const todos = await Todo.find();

      return res.status(200).json({
        message: todos.length ? "Todos fetched successfully" : "No todos found",
        data: todos,
      });
    } else {
      const userData = await User.findById(user._id).populate("todos");

      if (!userData) {
        return res.status(404).json({ message: "User not found" });
      }

      const todos = userData.todos || [];

      return res.status(200).json({
        message: todos.length ? "User todos fetched successfully" : "No todos found for this user",
        data: todos,
      });
    }
  } catch (error) {
    console.error("Error fetching todos:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
}


export async function createTodos(req, res) {
    const { user } = req;

    if (!user) {
        return res.status(401).json({ message: "Unauthorized: User not found in request" });
    }

    // Validate request body using Joi
    const { error, value } = todoSchema.validate(req.body, { abortEarly: false });

    if (error) {
        return res.status(400).json({
            message: "Validation error",
            details: error.details.map(err => err.message)
        });
    }

    const { title, description, dueDate, category } = value;

    try {
        // Create the todo
        const newTodo = new Todo({
            title,
            description,
            dueDate: dueDate ? new Date(dueDate) : null,
            category,
            userId: user._id
        });

        const savedTodo = await newTodo.save();

        // Link to user if not admin
        if (user.role !== "Admin") {
            await User.findByIdAndUpdate(user._id, {
                $push: { todos: savedTodo._id }
            });
        }

        return res.status(201).json({
            message: "Todo created successfully",
            data: savedTodo
        });

    } catch (err) {
        console.error("Error creating todo:", err);
        return res.status(500).json({ message: "Internal server error", error: err.message });
    }
}

export async function updateTodo(req, res) {
    const { user } = req;
    const { id } = req.params;

    if (!user) {
        return res.status(401).json({ message: "Unauthorized: User not found in request" });
    }
    
    const { error, value } = updateTodoSchema.validate(req.body, { abortEarly: false });
    if (error) {
        return res.status(400).json({
            message: "Validation error",
            details: error.details.map(err => err.message)
        });
    }

    try {
        const todo = await Todo.findById(id);

        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }
  console.log("check 0")
        // If not admin, check ownership
        if (user.role !== "Admin" && todo.userId.toString() !== user._id.toString()) {
            return res.status(403).json({ message: "Forbidden: You can only update your own todos" });
        }
       console.log("check1")
        // Update the todo with validated values
        Object.assign(todo, value);
        const updatedTodo = await todo.save();

        return res.status(200).json({
            message: "Todo updated successfully",
            data: updatedTodo
        });

    } catch (err) {
        console.error("Error updating todo:", err);
        return res.status(500).json({ message: "Internal server error", error: err.message });
    }
}

export async function deleteTodo(req, res) {
    const { user } = req;
    const { id } = req.params;

    if (!user) {
        return res.status(401).json({ message: "Unauthorized: User not found in request" });
    }

    try {
        const todo = await Todo.findById(id);
        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }
         console.log(todo)
        // Regular user can only delete their own todos
        if (user.role !== "Admin" && todo.userId.toString() !== user._id.toString()) {
            return res.status(403).json({ message: "Forbidden: You can only delete your own todos" });
        }

        await Todo.findByIdAndDelete(todo._id)

        // Remove the todo from the user's todo list (if not Admin)
        if (user.role !== "Admin") {
            await User.findByIdAndUpdate(user._id, {
                $pull: { todos: todo._id }
            });
        }

        return res.status(200).json({ message: "Todo deleted successfully" });

    } catch (err) {
        console.error("Error deleting todo:", err);
        return res.status(500).json({ message: "Internal server error", error: err.message });
    }
}


