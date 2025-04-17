import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 6
    },
    username: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["User", "Admin"],
        default: "User"
    },
    todos: [{
        type: mongoose.Types.ObjectId,
        ref: "Todo"
    }]
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
    next();
});

userSchema.methods.comparePass = async function (ogPassword) {
    return await bcrypt.compare(ogPassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
