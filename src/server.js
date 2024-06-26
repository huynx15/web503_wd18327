import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./routes/products.js";
import router_id from "./routes/index.js";
import router_auth from "./routes/auth.js";
import router_cat from "./routes/category.js";
const app = express();
dotenv.config();
const port = process.env.PORT;
mongoose.connect(process.env.DB);
// Khai báo template engine
app.set('views', './src/views');
app.set('view engine', 'ejs');
app.use(express.static('./src/public'));
// Khai báo middleware
// app.use(express.urlencoded({
//     extended: true,
// }));
app.use(express.json());


// Khai báo route
// Trang chủ
app.use('/', router_id);

app.use('/api/product', router);

app.use('/api/cat', router_cat);

app.use('/api/auth', router_auth);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})