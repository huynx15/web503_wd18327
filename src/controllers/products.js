import Category from "../models/Category.js";
import Products from "../models/products.js";
export const getAllProduct = async (req, res) => {
    try {
        const products = await Products.find();
        if (!products) {
            return res.status(404).json({
                message: "Không tìm thấy sản phẩm",
            });
        } else {
            return res.status(200).json({
                message: "Lấy sản phẩm thành công",
                data: products
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: error
        });
    }
}
export const getProductDetail = async (req, res) => {
    try {
        const product = await Products.findById(req.params.id);
        if (!product) {
            return res.status(404).json({
                message: "Không tìm thấy sản phẩm",
            });
        } else {
            return res.status(200).json({
                message: "Lấy sản phẩm thành công",
                data: product
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: error
        });
    }
}
export const addProduct = async (req, res) => {
    try {
        const product = await Products.create(req.body);
        if (!product) {
            return res.status(404).json({
                message: "Thêm sản phẩm thất bại",
            });
        } else {
            const updateCate = await Category.findByIdAndUpdate(product.categoryId, {
                $addToSet: {
                    products: product._id,
                }
            });
            if (!updateCate) {
                return res.status(404).json({
                    message: "Update danh mục thất bại",
                });
            }
            return res.status(200).json({
                message: "Thêm sản phẩm thành công",
                data: product
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: error
        });
    }
}
export const updateProduct = async (req, res) => {
    try {
        const product = await Products.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!product) {
            return res.status(404).json({
                message: "Không tìm thấy sản phẩm",
            });
        } else {
            return res.status(200).json({
                message: "Sửa sản phẩm thành công",
                data: product
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: error
        });
    }
}
export const deleteProduct = async (req, res) => {
    try {
        const product = await Products.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({
                message: "Không tìm thấy sản phẩm",
            });
        } else {
            return res.status(200).json({
                message: "Xóa sản phẩm thành công",
                data: product
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: error
        });
    }
}


// import { classname } from "./index.js";
// export const getAllProduct = async (req, res) => {
//     try {
//         const products = await Products.find();
//         res.render('list-products', { className: classname, products: products });
//     } catch (error) {
//         console.log(error);
//     }
// }
// export const getProductDetail = async (req, res) => {
//     try {
//         const pro = await Products.findById(req.params.id);
//         res.send(`
//         <h3>${pro.name}</h3>
//         <p>${pro.price}</p>
//         <p><a href="/list-products">Danh sách sản phẩm</a></p>
//     `);
//     } catch (error) {
//         console.log(error);
//     }
// }
// export const getFormAddProduct = (req, res) => {
//     res.render('add-product');
// }
// export const addProduct = async (req, res) => {
//     try {
//         let file = req.file;
//         let img = file.filename;
//         const new_pro = {
//             name: req.body.pro_name,
//             price: Number(req.body.pro_price),
//             image: img
//         }
//         await Products.create(new_pro);
//         res.redirect('/list-products');
//     } catch (error) {
//         console.log(error);
//     }
// }