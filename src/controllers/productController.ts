// import { Request, Response } from "express";
// import { ProductService } from "../services/ProductService";

// const productService = new ProductService();

// export const createProduct = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   try {
//     const productData = req.body;

//     // Validate product data
//     if (!productData.name || !productData.price || !productData.description) {
//       res.status(400).json({
//         message: "Invalid product data",
//         error: "Name, price and description are required",
//       });
//       return;
//     }

//     const newProduct = await productService.create(productData);
//     res.status(201).json(newProduct);
//   } catch (error) {
//     res.status(500).json({
//       message: "Error creating product",
//       error: error instanceof Error ? error.message : "Unknown error",
//     });
//   }
// };

// export const getAll = async(req: Request, res: Response): Promise<void> => {
//   try {
//     const products = await productService.getAll();
//     res.status(200).json(products);
//   } catch (error) {
//     res.status(500).json({
//       message: 'error retrieving products',
//       error: error instanceof Error ? error.message : 'unknown error',
//     });

//   }
// }

import { Router } from "express";
import { ProductService } from "../services/ProductService";

export const productController = Router();
const productService = new ProductService();

productController.get("/", async (req, res) => {
  try {
    const products = await productService.getAll();
    res.json(products);    
  } catch (error) {
    res.status(500).json({ error: 'something went wrong'});
  }
});
