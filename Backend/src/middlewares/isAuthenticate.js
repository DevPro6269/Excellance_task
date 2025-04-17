import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

async function isAuthenticate(req, res, next) {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader?.split(" ")[1];
       
        if (!token) {
            return res.status(401).json({ message: "Authorization token is missing" });
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        if (!decoded) {
            return res.status(403).json({ message: "Invalid or expired token" });
        }

        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        req.user = user;
        next();

    } catch (error) {
        console.error("Auth Middleware Error:", error.message);
        return res.status(500).json({ message: "Authentication failed", error: error.message });
    }
}

export default isAuthenticate;
