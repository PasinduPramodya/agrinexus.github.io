import express from "express";

import {
  create,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controller/productController.js";

const route = express.Router();

// Create a new product
route.post("/product", create);

// Retrieve all products
route.get("/products", getAllProducts);  // <-- updated

// Retrieve a single product by ID
route.get("/products/:id", getProductById);

// Update a product
route.put("/update/product/:id", updateProduct);

// Delete a product
route.delete("/delete/product/:id", deleteProduct);


export default route;