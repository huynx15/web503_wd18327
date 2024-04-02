import mongoose, { Schema } from "mongoose";
const cateSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Products",
        }
    ]
}, {
    collection: 'category',
    versionKey: false,
    timestamps: true
});
const Category = mongoose.model('Category', cateSchema);
export default Category;