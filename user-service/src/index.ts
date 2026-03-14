import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import userRoutes from './route.js'
import cors from 'cors' 


dotenv.config()

const app=express()
app.use(cors())

app.use(express.json())

async function main() {
  await mongoose.connect(process.env.MONGO_URI as string);

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

app.get("/",(req,res)=>{
  res.send("success")
})
app.use('/api/v1',userRoutes)


const port=process.env.PORT || 5000
app.listen(port,()=>{
  console.log(`server are listen on port ${port}`)
  main()
  .then(res=>console.log("database connect"))
  .catch(err => console.log(err));

})