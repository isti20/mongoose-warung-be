import Products from "../models/products.js";
import messages from "../utils/messages.js";
import Cloudinary from "../config/cloudinary.js";

const createProduct = async (req, res) => {
    const file = req.file;
    const body = req.body;

    if (file) {
        try {
            const result = await Cloudinary.uploader.upload(file.path);

            let product = await new Products({
                ...body,
                product_img: result.secure_url,
                cloudinary_id: result.public_id
            }).save();

            messages(res, 201, "Create product success", product);
        } catch (error) {
            messages(res, 500, error?.messages || "Internal server error");
        }
    } else messages(res, 423, "Image is required");
};

export { createProduct };