import express from "express";
import mongoose from "mongoose";
const app = express()
const port = 3000
mongoose.connect("mongodb://localhost:27017/wd18327");
// Khai báo Schema
const schema_pro = new mongoose.Schema({ name: String, price: Number, image: String });
const Products = mongoose.model('Products', schema_pro);
const schema_cat = new mongoose.Schema({ name: String }, { collection: 'category', versionKey: false });
const Category = mongoose.model('Category', schema_cat);
// Khai báo middleware
app.use(express.urlencoded({
    extended: true,
}));

// const products = [
//     { id: 1, name: "Sản phẩm 1", price: 100000 },
//     { id: 2, name: "Sản phẩm 2", price: 200000 },
//     { id: 3, name: "Sản phẩm 3", price: 300000 },
// ];
// Khai báo route
app.get('/', async (req, res) => {
    const products = await Products.find();
    const cate = await Category.find();
    console.log(products);
    console.log(cate);
    res.send(`
        <h2>Đây là trang chủ</h2>
        <a href="/gioi-thieu">Giới thiệu</a> | <a href="/list-products">Danh sách sản phẩm</a>
    `)
})
// Trang giới thiệu
app.get('/gioi-thieu', (req, res) => {
    res.send(`
        <h2>Đây là trang giới thiệu</h2>
        <a href="/">Quay lại trang chủ</a>
    `);
});
// Trang danh sách sản phẩm
app.get('/list-products', (req, res) => {
    let html = products.map(data => {
        return `
            <p><a href="/product/${data.id}">${data.name} - ${data.price}</a></p>
        `;
    }).join('');
    html += '<a href="/">Quay lại trang chủ</a> | <a href="/add-product">Thêm sản phẩm</a>';
    res.send(html);
})
// Trang chi tiết sản phẩm
app.get('/product/:id', async (req, res) => {
    const id_pro = req.params.id;
    const pro = await Products.findById(id_pro);
    console.log(pro);
    res.send(`
        <h3>${pro.name}</h3>
        <p>${pro.price}</p>
        <p><a href="/list-products">Danh sách sản phẩm</a></p>
    `);
});
app.get('/add-product', (req, res) => {
    res.send(`
        <p><a href="/list-products">Danh sách sản phẩm</a></p>
        <form action="" method="post">
            <input type="text" name="pro_name" placeholder="Tên sản phẩm">
            <input type="text" name="pro_price" placeholder="Giá sản phẩm">
            <input type="submit" name="" value="Thêm sản phẩm">
        </form>
    `);
});
// Route Post
app.post('/add-product', (req, res) => {
    console.log(req.body);
    const new_pro = {
        id: products.length + 1,
        name: req.body.pro_name,
        price: Number(req.body.pro_price)
    }
    products.push(new_pro);
    res.redirect('/list-products');
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})