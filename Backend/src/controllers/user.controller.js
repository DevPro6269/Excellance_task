import generateAccessTokoen from "../middlewares/generateAccessToken.js";
import User from "../models/user.model.js";
import validUser from "../Validation/userValidation.js";




export async function registerUser(req,res){
   try {
    const {username,email,password,role}=req.body;
    if(!username||!email||!password)return res.status(400).json({message:"please prove all valid feild",statusCode:404})
    //  const allFeildsFilled = validUser(req.body)
  
    // console.log(allFeildsFilled)
    
      const ifUserExist = await User.findOne({email}) 
      
      if(ifUserExist)return res.status(400).json({message:"user already registerd with this email",statusCode:400})
      
      const newUser = await User.create({
        username,
        email,
        password,
        role
      })

      if(!newUser)return res.status(400).json({message:"internal server error",statusCode:500})
      
        const token = generateAccessTokoen(newUser._id)

        return res.status(201).json({message:"user created successfully",data:{newUser,token},statusCode:201})
   } catch (error) {
    return res.status(404).json({message:"something went wrong"})
   }

}

export async function loginUser(req,res) {
    try {
         const {email,password} = req.body;
    
         if(!email||!password)return res.status(400).json({message:"please provide all feilds",statusCode:400})
    
         const ifUserExist =  await User.findOne({email})
    
         if(!ifUserExist)return res.status(404).json({message:"user is not registered with this email"})
         const token = generateAccessTokoen(ifUserExist._id)
    
         return res.status(200).json({message:"user logged in successfully",data:{
            token:token,
            userId:ifUserExist._id,
            role:ifUserExist.role
         }})
    } catch (error) {
        return res.status(500).json({message:"internal server error",statusCode:500})
    }
}