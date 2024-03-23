import express from "express";
import { uploadFile } from '../models/products.js';
import { addProduct, deleteProduct, getAllProduct, getProductDetail, updateProduct } from "../controllers/products.js";
const router = express.Router();
// Trang danh sách sản phẩm
router.get('/product', getAllProduct);
// Trang chi tiết sản phẩm
router.get('/product/:id', getProductDetail);
// Trang thêm sản phẩm
router.post('/product', addProduct);
// Trang sửa sản phẩm
router.put('/product/:id', updateProduct);
// Trang xóa sản phẩm
router.delete('/product/:id', deleteProduct);

export default router;