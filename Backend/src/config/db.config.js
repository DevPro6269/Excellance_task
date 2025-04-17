import mongoose from "mongoose";

async function connectDB(){
  await  mongoose.connect(`${process.env.MONGO_URI}`).then(()=>{
        console.log("database is connected succesfully")
    }).catch((err)=>{
        console.log(`error found while connecting db ${err}`)
    })
}

export default connectDB;