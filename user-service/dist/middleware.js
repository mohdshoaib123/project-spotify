import jwt, {} from 'jsonwebtoken';
import { User } from './model.js';
export const isAuth = async (req, res, next) => {
    const token = req.headers.token || req.cookies.token;
    if (!token) {
        return res.status(403).json({ message: "please login" });
    }
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decode._id);
        req.user = user;
        next();
    }
    catch (error) {
        return res.status(403).json({ message: "please login" });
    }
};
//# sourceMappingURL=middleware.js.map