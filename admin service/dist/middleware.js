import axios from "axios";
import dotenv from 'dotenv';
dotenv.config();
export const isAuth = async (req, res, next) => {
    const token = req.headers.token || req.cookies.token;
    try {
        if (!token) {
            return res.status(403).json({ message: "login first" });
        }
        const { data } = await axios.get(`${process.env.USER_URL}/api/v1/user/getprofile`, { headers: { token } });
        req.user = data.user;
        next();
    }
    catch (error) {
        console.log(error);
        return res.status(403).json({ message: 'please here login ' });
    }
};
import multer from 'multer';
const storage = multer.memoryStorage();
export const uploadfile = multer({ storage }).single("image");
//# sourceMappingURL=middleware.js.map