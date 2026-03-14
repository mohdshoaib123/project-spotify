import  express  from "express";
import  { addToPlayList, getMyProfile, userLogin, userRegister } from "./controller.js";
import { isAuth } from "./middleware.js";

const router=express.Router()

router.post("/user/register",userRegister)
router.post("/user/login",userLogin)
router.get("/user/getprofile",isAuth,getMyProfile)
router.get("/song/:id",isAuth,addToPlayList)


export default router
