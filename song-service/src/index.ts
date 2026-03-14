import express from "express";
import dotenv from "dotenv"
import songRoute from './route.js'
import redis from 'redis'
import cors from 'cors'




dotenv.config()

export const redisClient=redis.createClient({password:process.env.REDIS_PASSWORD as string,
  socket:{
  host:"redis-18310.crce206.ap-south-1-1.ec2.cloud.redislabs.com",
  port:18310}
})

redisClient.connect()
.then(()=>console.log("connected to redis"))
.catch((err)=>console.log(err))

const app=express()
app.use(cors())



const PORT =process.env.PORT

app.use('/api/v1',songRoute)

app.listen(PORT,()=>{
  console.log(`server are listen on PORT ${PORT}`)

})

