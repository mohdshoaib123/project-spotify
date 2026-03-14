import jwt, { type JwtPayload } from 'jsonwebtoken'

import type { NextFunction,Request,Response } from 'express'
import { User, type IUser } from './model.js'

export interface AuthenticateRequest extends Request {
  user?: IUser|null
}

export const isAuth =async(req:AuthenticateRequest,res:Response,next:NextFunction)=>{
const token= req.headers.token as string ||  req.cookies.token as string

if(!token){
 return res.status(403).json({message:"please login"})
}

try {
  const decode=jwt.verify(token,process.env.JWT_SECRET as string  ) as JwtPayload
  const user=await User.findById(decode._id)
  req.user=user 
  next()
  
} catch (error) {
  return res.status(403).json({message:"please login"})
  
}
}