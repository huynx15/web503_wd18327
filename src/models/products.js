import mongoose from "mongoose";
import multer from "multer";
const Pro_Schema = new mongoose.Schema({ name: String, price: Number, image: String }, { versionKey: false });
const Products = mongoose.model('Products', Pro_Schema);

// Khai báo hàm upload ảnh
const storage = multer.diskStorage({
    // Khai báo folder lưu trữ ảnh
    destination: (req, file, cb) => {
        cb(null, './src/public/images');
    },
    // Tên file ảnh
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
export let uploadFile = multer({ storage: storage });

export default Products;