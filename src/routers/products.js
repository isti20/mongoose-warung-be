import express from "express";
import { createProduct } from "../controllers/products.js";

const Router = express.Router();

Router.post("/products", createProduct);

export default Router;