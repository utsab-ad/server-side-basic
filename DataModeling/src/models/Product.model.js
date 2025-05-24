import mongoose from "mongoose";

const productSchema = new mongoose.Schema({});

const Product = mongoose.model("Product", productSchema, "products");

export default Product;