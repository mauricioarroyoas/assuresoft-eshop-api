import { Router } from "express";
import { ProductService } from "../services/ProductService";

export const productController = Router();
const productService = new ProductService();

productController.get("/", async (req, res) => {
  try {
    const products = await productService.getAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "something went wrong" });
  }
});

productController.post("/", async (req, res) => {
  try {
    const productData = req.body;
    if (!productData.name || !productData.price || !productData.description) {
      res.status(400).json({
        message: "invalid product data",
        error: "name, price and description are required",
      });
    }
    const newProduct = await productService.create(productData);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({
      message: "error craeting the product",
      error: error instanceof Error ? error.message : "unknowns error",
    });
  }
});

productController.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
      res.status(400).json({error: "id must be a number"})
    }
    const product = await productService.getById(id);
    res.json(product);
  } catch (error) {
    res.status(500).json({error: "product doesn't exist"})
  }
})