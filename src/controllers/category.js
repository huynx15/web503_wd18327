import Category from "../models/Category.js";
export const getAllCate = async (req, res) => {
    try {
        const cate = await Category.find();
        if (!cate) {
            return res.status(404).json({
                message: "Không tìm thấy danh mục sản phẩm",
            });
        } else {
            return res.status(200).json({
                message: "Lấy danh mục sản phẩm thành công",
                data: cate
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: error
        });
    }
}
export const getCateOne = async (req, res) => {
    try {
        const cate = await Category.findById(req.params.id).populate('products');
        if (!cate) {
            return res.status(404).json({
                message: "Không tìm thấy danh mục sản phẩm",
            });
        } else {
            return res.status(200).json({
                message: "Lấy danh mục sản phẩm thành công",
                data: cate
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: error
        });
    }
}
export const addCate = async (req, res) => {
    try {
        const cate = await Category.create(req.body);
        if (!cate) {
            return res.status(404).json({
                message: "Thêm danh mục sản phẩm thất bại",
            });
        } else {
            return res.status(200).json({
                message: "Thêm danh mục sản phẩm thành công",
                data: cate
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: error
        });
    }
}
export const updateCate = async (req, res) => {
    try {
        const cate = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!cate) {
            return res.status(404).json({
                message: "Không tìm thấy danh mục sản phẩm",
            });
        } else {
            return res.status(200).json({
                message: "Sửa danh mục sản phẩm thành công",
                data: cate
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: error
        });
    }
}
export const deleteCate = async (req, res) => {
    try {
        const cate = await Category.findByIdAndDelete(req.params.id);
        if (!cate) {
            return res.status(404).json({
                message: "Không tìm thấy danh mục sản phẩm",
            });
        } else {
            return res.status(200).json({
                message: "Xóa danh mục sản phẩm thành công",
                data: cate
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: error
        });
    }
}