import express from "express";
import { uploadFile } from '../models/products.js';
import { addProduct, getAllProduct, getFormAddProduct, getProductDetail } from "../controllers/products.js";
const router = express.Router();
// Trang danh sách sản phẩm
router.get('/list-products', getAllProduct);
// Trang chi tiết sản phẩm
router.get('/product/:id', getProductDetail);
// Trang thêm sản phẩm - POST
router.get('/add-product', getFormAddProduct);
// Route Post
router.post('/add-product', uploadFile.single('pro_file'), addProduct);

export default router;