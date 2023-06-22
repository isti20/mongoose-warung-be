import express from "express";
import uploadImg from "../middleware/multer.js";
import { createProduct, allProduct } from "../controllers/products.js";

const Router = express.Router();

Router.post("/products", uploadImg, createProduct);
Router.get("/products", allProduct);

export default Router;