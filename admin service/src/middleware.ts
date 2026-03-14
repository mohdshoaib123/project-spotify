import type { NextFunction, Request, Response } from "express"
import axios from "axios"
import dotenv from 'dotenv'

dotenv.config()

 interface IUser {
  _id:string
  name:string,
  email:string,
  password:string,
  role:string,
  playlist:string[]
}
 interface Authenticate extends Request{
  user?:IUser | null
 }

export const isAuth=async (req:Authenticate,res:Response,next:NextFunction)=>{
  const token= req.headers.token as string || req.cookies.token as string

  try {
    if(!token){
      return res.status(403).json({message:"login first"})
    }

   const{data}= await axios.get(`${process.env.USER_URL}/api/v1/user/getprofile`,{headers:{token}})

   req.user=data.user
   
   next()
    
    
  } catch (error) {
    console.log(error)
    return res.status(403).json({message:'please here login '})
  }

}

import multer from 'multer'

const storage=multer.memoryStorage()
export const uploadfile=multer({storage}).single("image")
