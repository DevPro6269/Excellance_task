import app from "./app.js";
import connectDB from "./config/db.config.js";
import env from "dotenv"
env.config()

connectDB().then(()=>{
    app.listen(8080,()=>{
        console.log("app is listeing on port 8080")
    })
})
.catch((err)=>{
    console.log(err)
})