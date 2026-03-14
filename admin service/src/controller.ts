import type { NextFunction, Request, Response } from "express";
import { tryCatch } from "./tryCatch.js";
import getBuffer from "./config/dataUri.js";
import cloudinary from 'cloudinary'
import { sql } from "./config/db.js";
import { redisClient } from "./index.js";

interface AuthenticatedRequest extends Request{
  user?:{
    _id:string,
    role:string
  }
}
export const addAlbum =tryCatch(async(req:AuthenticatedRequest,res:Response,next:NextFunction)=>{
  if(req.user?.role!="admin"){
   return  res.status(401).json({message:"you are not admin"})  }

    const{title,description}=req.body
    const file=req.file
   
    

if(!file){
  return res.status(400).json({message:"no file provided"})
}
const fileBuffer=getBuffer(file)
if(!fileBuffer || !fileBuffer.content){
 return res.status(500).json({message:"failed to generate file buffer"})
}

const cloud=await cloudinary.v2.uploader.upload(fileBuffer.content, {
    
    folder: "albums"
  })
const result=await sql`
INSERT INTO albums
(title,description,thumbnail)
VALUES
(${title},${description},${cloud.secure_url}) RETURNING *`

if(redisClient?.isReady){
  try{
  await redisClient.del("albums")}
  catch(err){
    console.log(err)
  }
}
res.json({message:"Albam created ",album:result[0]})
})


export const addSong= tryCatch(async(req:AuthenticatedRequest,res:Response)=>{
if(req.user?.role!="admin"){
   return  res.status(401).json({message:"you are not admin"})}

const{title,description,album}=req.body
const isAlbum=await sql`SELECT * FROM albums WHERE id=${album}`;
if(isAlbum.length===0){
 return res.status(404).json({message:"no album with this id"})
}
    const file=req.file
    if(!file){
      return res.status(400).json({message:"no file provided"})}

      const fileBuffer=getBuffer(file)
      if(!fileBuffer || !fileBuffer.content){
         return res.status(500).json({message:"failed to generate file buffer"})
      }
      const cloud=await cloudinary.v2.uploader.upload(fileBuffer.content,{folder:"songs",resource_type:"video"})

      const result=await sql`
      INSERT INTO songs(title,description,audio,album_id)
      VALUES(${title},${description},${cloud.secure_url},${album}) RETURNING *`

      if(redisClient?.isReady){
        try{
  await redisClient.del("songs")}
  catch(err){
    console.log(err)
  }
}
      res.status(201).json({message:"song added"})

})

export const addThumbnail=tryCatch(async (req:AuthenticatedRequest,res:Response)=>{
  if(req.user?.role!="admin"){
    return res.status(401).json({message:"you are not admin"})

  }
  const song=await sql`SELECT * FROM songs WHERE id=${req.params.id}`
if(song.length===0){
  return res.status(404).json({message:"no song with this id"})
}
const file=req.file
if(!file){
  return res.status(400).json({message:"no file to upload"})
}
const fileBuffer=getBuffer(file)
if(!fileBuffer || !fileBuffer.content){
  return res.status(500).json({message:"failed to generate filebuffer"})
}
const cloud=cloudinary.v2.uploader.upload(fileBuffer.content)
const result=await sql `UPDATE songs SET thumbnail=${(await cloud).secure_url} WHERE id=${req.params.id} RETURNING *`

if(redisClient.isReady){
  await redisClient.del("songs")
}

res.json({message:"thumbnail added ",
  song:result[0]
})

})
export const deleteAlbum=tryCatch(async(req:AuthenticatedRequest,res:Response)=>{
  if(req.user?.role!="admin"){
    res.status(401).json({message:"you are not user"})
  }
const id=req.params.id
const isAlbum=await sql`SELECT * FROM albums WHERE id=${id} `
if(isAlbum.length===0){
  return res.status(404).json({message:"no album with this id"})
}
await sql `DELETE FROM songs WHERE album_id=${id}`
await sql `DELETE FROM albums WHERE id=${id}`
 if(redisClient?.isReady){
        try{
  await redisClient.del("albums")}
  catch(err){
    console.log(err)
  }
}
res.json({message:"album delete successfully"})
})

export const deleteSong=tryCatch(async(req:AuthenticatedRequest,res:Response)=>{
  if(req.user?.role!="admin"){
    return res.status(401).json({message:"you are not admin"})
  }
const id=req.params.id
  const song=await sql `SELECT * FROM songs WHERE id=${id}`
  if(song.length===0){
    return res.status(401).json({message:"no song exist with this id"})
  }
  await sql `DELETE FROM songs WHERE id=${id}`

  if(redisClient.isReady){
    try{
  await redisClient.del(`song_${id}`)}
  catch(err){
    console.log(err)
  }
}
  res.status(200).json({message:"song delete successfully"})
})