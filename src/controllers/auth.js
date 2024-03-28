import Users from "../models/User.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { signInValidation, signUpValidation } from "../validations/auth.js";
import dotenv from "dotenv";
dotenv.config();

export const signUp = async (req, res) => {
    try {
        // Validate dữ liệu
        const { error } = signUpValidation.validate(req.body, { abortEarly: false });
        if (error) {
            const errors = error.details.map(err => err.message);
            return res.status(400).json({
                message: errors
            });
        }
        // Kiểm tra email đã tồn tại chưa
        const emaillUser = await Users.findOne({ email: req.body.email });
        if (emaillUser) {
            return res.status(400).json({
                message: "Email đã tồn tại"
            });
        }
        // Mã hóa password
        const hashedPassword = await bcryptjs.hash(req.body.password, 10);
        // Khởi tạo user
        const user = await Users.create({
            ...req.body,
            password: hashedPassword
        });
        // Thông báo cho người dùng
        user.password = undefined;
        return res.status(200).json({
            message: "Đăng ký thành công",
            data: user
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

export const signIn = async (req, res) => {
    try {
        // Validate dữ liệu
        const { error } = signInValidation.validate(req.body, { abortEarly: false });
        if (error) {
            const errors = error.details.map(err => err.message);
            return res.status(400).json({
                message: errors
            });
        }
        // Kiểm tra email|username đã tồn tại chưa
        const user = await Users.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({
                message: "Tài khoản không tồn tại"
            });
        }
        // Kiểm tra pass
        const cppass = await bcryptjs.compare(req.body.password, user.password);
        if (!cppass) {
            return res.status(400).json({
                message: "Mật khẩu không chính xác"
            });
        }
        // Khởi tạo Token
        const accessToken = jwt.sign({ _id: user._id }, process.env.SCERET_CODE);
        // Thông báo 
        user.password = undefined;
        return res.status(200).json({
            message: "Đăng nhập thành công",
            data: user,
            accessToken: accessToken
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}