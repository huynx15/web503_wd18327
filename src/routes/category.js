import express from "express";
import { addCate, deleteCate, getAllCate, getCateOne, updateCate } from "../controllers/category.js";
const router_cat = express.Router();
// Trang danh sách sản phẩm
router_cat.get('/', getAllCate);
// Trang chi tiết sản phẩm
router_cat.get('/:id', getCateOne);
// Trang thêm sản phẩm
router_cat.post('/', addCate);
// Trang sửa sản phẩm
router_cat.put('/:id', updateCate);
// Trang xóa sản phẩm
router_cat.delete('/:id', deleteCate);

export default router_cat;