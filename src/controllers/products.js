import Products from "../models/products.js";
import messages from "../utils/messages.js";

const createProduct = async (req, res) => {
    try {
        messages(res, 200, "Helo guys!");
    } catch (error) {
        messages(res, 500, error?.messages || "Internal server error");
    }
};

export { createProduct };