import express from "express";
import { uploadFile } from '../models/products.js';
import { addProduct, deleteProduct, getAllProduct, getProductDetail, updateProduct } from "../controllers/products.js";
import { checkPermission } from "../middlewares/checkPermission.js";
const router = express.Router();
// Trang danh sách sản phẩm
router.get('/', getAllProduct);
// Trang chi tiết sản phẩm
router.get('/:id', getProductDetail);
// Trang thêm sản phẩm
router.post('/', checkPermission, addProduct);
// Trang sửa sản phẩm
router.put('/:id', updateProduct);
// Trang xóa sản phẩm
router.delete('/:id', deleteProduct);

export default router;