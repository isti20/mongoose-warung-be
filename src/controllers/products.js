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

const allProduct = async (req, res) => {
    try {
        const result = await Products.find();

        messages(res, 200, "All product", result);
    } catch (error) {
        messages(res, 500, error?.messages || "Internal server error");
    }
};

const detailProduct = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await Products.findById(id);

        messages(res, 200, "Detail product", result);
    } catch (error) {
        messages(res, 500, error?.messages || "Internal server error");
    }
};

const deleteProduct = async (req, res) => {
    const id = req.params.id;

    try {
        const product = await Products.findById(id);

        if (!product) return messages(res, 404, "Product not found");

        // delete image from cloudinary
        await Cloudinary.uploader.destroy(product.cloudinary_id);

        // delete product from database
        await Products.deleteOne(product._id);

        messages(res, 200, "Delete product success");
    } catch (error) {
        messages(res, 500, error?.messages || "Internal server error");
    }
};

const updateProduct = async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    const file = req.file;

    try {
        let product = await Products.findById(id);
        const data = { ...body };

        if (!product) return messages(res, 404, "Product not found");

        if (file) {
            // delete image from cloudinary
            await Cloudinary.uploader.destroy(product.cloudinary_id);

            // upload new image to cloudinary
            const result = await Cloudinary.uploader.upload(file.path);

            data.product_img = result.secure_url;
            data.cloudinary_id = result.public_id;
        }

        const newData = await Products.findByIdAndUpdate(id, data, {
            new: true,
        });

        messages(res, 200, "Update product success", newData);
    } catch (error) {
        messages(res, 500, error?.messages || "Internal server error");
    }
};

export { createProduct, allProduct, detailProduct, deleteProduct, updateProduct };