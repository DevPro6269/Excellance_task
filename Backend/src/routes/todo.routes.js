import express from "express"
import isAuthenticate from "../middlewares/isAuthenticate.js"
import { createTodos, deleteTodo, getTodos, updateTodo } from "../controllers/todo.controller.js";
const router = express.Router()


router.route("/").post(isAuthenticate,createTodos)
.get(isAuthenticate,getTodos)

router.route("/:id").put(isAuthenticate,updateTodo)
.delete(isAuthenticate,deleteTodo)


export default router ;