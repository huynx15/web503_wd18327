import Products from "../models/products.js";
import { classname } from "./index.js";
export const getAllProduct = async (req, res) => {
    try {
        const products = await Products.find();
        res.render('list-products', { className: classname, products: products });
    } catch (error) {
        console.log(error);
    }
}
export const getProductDetail = async (req, res) => {
    try {
        const pro = await Products.findById(req.params.id);
        res.send(`
        <h3>${pro.name}</h3>
        <p>${pro.price}</p>
        <p><a href="/list-products">Danh sách sản phẩm</a></p>
    `);
    } catch (error) {
        console.log(error);
    }
}
export const getFormAddProduct = (req, res) => {
    res.render('add-product');
}
export const addProduct = async (req, res) => {
    try {
        let file = req.file;
        let img = file.filename;
        const new_pro = {
            name: req.body.pro_name,
            price: Number(req.body.pro_price),
            image: img
        }
        await Products.create(new_pro);
        res.redirect('/list-products');
    } catch (error) {
        console.log(error);
    }
}