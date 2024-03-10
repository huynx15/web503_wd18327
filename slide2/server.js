const express = require('express')
const app = express()
const port = 3000
// Khai báo template engine
app.set('views', './src/views');
app.set('view engine', 'ejs');
app.use(express.static('./src/public'));
// Khai báo middleware
app.use(express.urlencoded({
    extended: true,
}));

const products = [
    { id: 1, name: "Sản phẩm 1", price: 100000 },
    { id: 2, name: "Sản phẩm 2", price: 200000 },
    { id: 3, name: "Sản phẩm 3", price: 300000 },
];
let classname = "WD18327";
// Khai báo route
// Trang chủ
app.get('/', (req, res) => {
    res.render('index', { className: classname });
})
// Trang danh sách sản phẩm
app.get('/list-products', (req, res) => {
    res.render('list-products', { className: classname, products: products });
})
// Trang chi tiết sản phẩm
app.get('/product/:id', (req, res) => {
    const id_pro = req.params.id;
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