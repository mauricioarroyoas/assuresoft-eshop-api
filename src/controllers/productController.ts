import { Router } from "express";
import { ProductService } from "../services/ProductService";

export const productController = Router();
const productService = new ProductService();

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - price
 *         - description
 *       properties:
 *         id:
 *           type: integer
 *           description: Auto-generated ID of the product
 *         name:
 *           type: string
 *         price:
 *           type: number
 *         description:
 *           type: string
 *       example:
 *         id: 1
 *         name: "Laptop"
 *         price: 1299.99
 *         description: "High-end gaming laptop"
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: A list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */

productController.get("/", async (req, res) => {
  try {
    const products = await productService.getAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "something went wrong" });
  }
});


/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: The created product
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 */

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
      error:  (error as Error).message,
    });
  }
});


/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the product to retrieve
 *     responses:
 *       200:
 *         description: Product found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 */
productController.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      res.status(400).json({ error: "id must be a number" });
    }
    const product = await productService.getById(id);
    res.json(product);
  } catch (error) {
    res.status(404).json({ error: "product doesn't exist" });
  }
});

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 */

productController.delete("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const result = await productService.delete(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({
      error:(error as Error).message,
    });
  }
});

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Update a product completely by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Product updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 */

productController.put("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const updatedProduct = await productService.update(id, req.body);
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(404).json({
      error: (error as Error).message,
    });
  }
});

/**
 * @swagger
 * /products/{id}:
 *   patch:
 *     summary: Partially update a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               price: 999.99
 *     responses:
 *       200:
 *         description: Product field(s) updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 */

productController.patch("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const fieldUpdated = await productService.updateField(id, req.body);
    res.status(200).json(fieldUpdated);
  } catch (error) {
    res.status(404).json({
      error: (error as Error).message,
    });
  }
});
