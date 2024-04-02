import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Users from "../models/User.js";
dotenv.config();
const { SECRET_CODE } = process.env;
export const checkPermission = async (req, res, next) => {
    try {
        // Kiểm tra đăng nhập
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(403).json({
                message: "Bạn chưa đăng nhập"
            });
        }
        // console.log(token);
        // Kiêm tra token
        const decoded = jwt.verify(token, SECRET_CODE);
        const user = await Users.findById(decoded._id);
        if (!user) {
            return res.status(403).json({
                message: "Token lỗi"
            });
        }
        // Kiểm tra quyền
        if (user.role != "admin") {
            return res.status(403).json({
                message: "Bạn không có quyền thực hiện chức năng này",
            });
        }
        //
        next();
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
}