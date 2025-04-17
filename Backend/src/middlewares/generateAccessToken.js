import jwt from "jsonwebtoken"

 function generateAccessTokoen(userId){
  const token =   jwt.sign({id:userId},process.env.SECRET_KEY,{expiresIn:"1h"})
  return token
}

export default generateAccessTokoen;