import mongoose from "../config/mongoose.js";

const productSchema = new mongoose.Schema({
    name: String,
    stock: Number,
    price: Number,
    product_img: String,
    cloudinary_id: String
});

// Collections
export default mongoose.model("Products", productSchema);