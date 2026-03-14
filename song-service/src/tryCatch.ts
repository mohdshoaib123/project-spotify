import { request, type RequestHandler } from "express";
import type { NextFunction, Request, Response } from "express-serve-static-core";

export const tryCatch=(handler:RequestHandler)=>{
  return async (req:Request,res:Response,next:NextFunction)=>{
    try{
     await handler(req,res,next)
    }
    catch(error:any){
      res.status(500).json({
        message:error.message
      })

    }
  }
}