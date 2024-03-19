const express = require('express');
const app = express();
const port = 3000;
const multer = require('multer');
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/wd18327');
// Khai báo template engine
app.set('views', './src/views');
app.set('view engine', 'ejs');
app.use(express.static('./src/public'));
// Khai báo middleware
app.use(express.urlencoded({
    extended: true,
}));
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
let uploadFile = multer({ storage: storage });
//
// const products = [
//     { id: 1, name: "Sản phẩm 1", price: 100000, image: "anh1.jpg" },
//     { id: 2, name: "Sản phẩm 2", price: 200000, image: "anh1.jpg" },
//     { id: 3, name: "Sản phẩm 3", price: 300000, image: "anh1.jpg" },
// ];
const Pro_Schema = new mongoose.Schema({ id: String, name: String, price: Number, image: String }, { versionKey: false });
const Products = mongoose.model('Products', Pro_Schema);

let classname = "WD18327";
// Khai báo route
// Trang chủ
app.get('/', (req, res) => {
    res.render('index', { className: classname });
})
// Trang danh sách sản phẩm
app.get('/list-products', async (req, res) => {
    products = await Products.find();
    console.log(Products.find());
    res.render('list-products', { className: classname, products: products });
})
// Trang chi tiết sản phẩm
app.get('/product/:id', async (req, res) => {
    const id_pro = req.params.id;
    products = await Products.find(pro => pro._id == req.params.id);
    const pro = products.find(data => data.id == id_pro);
    res.send(`
        <h3>${pro.name}</h3>
        <p>${pro.price}</p>
        <p><a href="/list-products">Danh sách sản phẩm</a></p>
    `);
});
// // Trang thêm sản phẩm
// app.get('/add-product', (req, res) => {
//     res.send(`
//         <p><a href="/list-products">Danh sách sản phẩm</a></p>
//         <form action="" method="">
//             <input type="text" name="pro_name" placeholder="Tên sản phẩm">
//             <input type="text" name="pro_price" placeholder="Giá sản phẩm">
//             <input type="submit" name="" value="Thêm sản phẩm">
//         </form>
//     `);
//     if (Object.keys(req.query).length != 0) {
//         const new_pro = {
//             id: products.length + 1,
//             name: req.query.pro_name,
//             price: Number(req.query.pro_price)
//         }
//         products.push(new_pro);
//     }
// });
// Trang thêm sản phẩm - POST
app.get('/add-product', (req, res) => {
    res.render('add-product');
});
// Route Post
app.post('/add-product', uploadFile.single('pro_file'), async (req, res) => {
    // console.log(req.body);
    let file = req.file;
    let img = file.filename;
    const new_pro = {
        // id: products.length + 1,
        name: req.body.pro_name,
        price: Number(req.body.pro_price),
        image: img
    }
    // products.push(new_pro);
    await Products.create(new_pro);
    res.redirect('/list-products');
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})