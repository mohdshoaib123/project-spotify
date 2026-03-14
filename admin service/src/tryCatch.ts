import type { RequestHandler,Request,Response } from "express";
import type { NextFunction } from "express-serve-static-core";

export const tryCatch= (handler:RequestHandler)=>{

 return async(req:Request,res:Response,next:NextFunction)=>{

 
  try{
    await handler(req,res,next)
  }
  catch(err:any){
    console.log(err)
return res.status(500).send({message:err.message})
  }
}
}