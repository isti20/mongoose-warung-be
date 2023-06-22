import express from "express";
import uploadImg from "../middleware/multer.js";
import { createProduct } from "../controllers/products.js";

const Router = express.Router();

Router.post("/products", uploadImg, createProduct);

export default Router;