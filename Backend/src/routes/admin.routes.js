import express from "express"
import isAuthenticate from "../middlewares/isAuthenticate.js";
import { getAllTodos, getAllUsers, updateUserRole } from "../controllers/admin.controller.js";
const router = express.Router()

router.route("/users").get(isAuthenticate,getAllUsers)
router.route("/users/:id/role").patch(isAuthenticate,updateUserRole)

router.route("/todos").get(isAuthenticate,getAllTodos)

export default router;