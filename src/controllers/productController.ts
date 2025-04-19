import { Request, Response } from "express";
import { ProductService } from "../services/ProductService";

const productService = new ProductService();

export const createProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const productData = req.body;
    const newProduct = await productService.create(productData);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({
      message: "Error creating product",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
