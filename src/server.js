import express from "express";
import mongoose from "mongoose";
import router from "./routes/products.js";
import router_id from "./routes/index.js";
const app = express();
const port = 3000;
mongoose.connect('mongodb://127.0.0.1:27017/wd18327');
// Khai báo template engine
app.set('views', './src/views');
app.set('view engine', 'ejs');
app.use(express.static('./src/public'));
// Khai báo middleware
app.use(express.urlencoded({
    extended: true,
}));


// Khai báo route
// Trang chủ
app.use('/', router_id);

app.use('/', router);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})