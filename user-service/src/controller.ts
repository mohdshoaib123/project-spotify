import type{ NextFunction, Request,Response } from "express";
import  { tryCatch } from "./tryCatch.js";
import { User } from "./model.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import type { AuthenticateRequest } from "./middleware.js";

export const userRegister= tryCatch( async (req:Request,res:Response)=>{
  
const {name,email,password,role}=req.body
let user=await User.findOne({email:email})
if(user){
 return res.status(400).json({message:"user already exist"})
}
const hashpass= await bcrypt.hash(password,10)

user=await User.create({name:name,email:email,password:hashpass,role})

const token =jwt.sign({_id:user._id},process.env.JWT_SECRET as string,{expiresIn:'7d'})
res.cookie("token",token)
res.status(201).send({user:user,
  token:token,
  message:'user Register successfully'
})

})

export const userLogin=tryCatch(async(req:Request,res:Response,next:NextFunction)=>{
  const{email,password}=req.body
  const user=await User.findOne({email:email})
  if(!user){
    return res.status(400).json({message:"Invalid email or password"})
  }
  const isMatched=bcrypt.compare(password,user.password)

  if(!isMatched){
    return res.status(400).json({message:"Invalid email or password"})
  }
  const token=jwt.sign({_id:user._id},process.env.JWT_SECRET as string,{expiresIn:"7d"})
  res.cookie("token",token)
res.status(200).json({user:user,token:token,message:"user login successfully"})
})

export const getMyProfile=tryCatch(async(req:AuthenticateRequest,res:Response)=>{
  const user=req.user
  res.status(200).json({message:"profile fetch successfully",user})
})

export const addToPlayList= tryCatch(async(req:AuthenticateRequest,res:Response)=>{

const userId=req.user?._id

const user=await User.findById(userId)
const id=req.params.id as string
if(!user){
  return res.status(404).json({message:"no user exist with this id"})
}
if(user?.playlist.includes(id))
{
  const index=user.playlist.indexOf(id)
  user.playlist.splice(index,1)
  await user.save()
 return res.json({message:"Removed from playlist"})
}
user?.playlist.push(id)
await user.save()
res.json({message:"Added in playlist"})


})