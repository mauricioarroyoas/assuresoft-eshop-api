import { Request, Response } from "express";
import { ProductService } from "../services/ProductService";

const productService = new ProductService();

export const createProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const productData = req.body;

    // Validate product data
    if (!productData.name || !productData.price || !productData.description) {
      res.status(400).json({
        message: "Invalid product data",
        error: "Name, price and description are required",
      });
      return;
    }

    const newProduct = await productService.create(productData);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({
      message: "Error creating product",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
