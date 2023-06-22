import express from "express";
import uploadImg from "../middleware/multer.js";
import { createProduct, allProduct, detailProduct } from "../controllers/products.js";

const Router = express.Router();

Router.post("/products", uploadImg, createProduct);
Router.get("/products", allProduct);
Router.get("/products/:id", detailProduct);

export default Router;