import mongoose from "mongoose"

const todoSchema =  new  mongoose.Schema({

userId:{
    type:mongoose.Types.ObjectId,
    ref:"User",
    required:true
},
  title:{
    type:String,
     required:true
  },
  description:{
    type:String,
    required:true
  },
  dueDate:{
    type:Date,
  },
  completedStatus:{
    type:String,
    default:"Pending",
    enum:["Pending","Completed"]
  },
  category:{
    type:"String",
    enum:["Urgent","Non-Urgent"],
    required:true
  }

})

const Todo = mongoose.model("Todo",todoSchema)

export default Todo;