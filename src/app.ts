import express from "express";
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './docs/swagger';
import { productController } from "./controllers/productController";

// App
export const app = express();
app.use(express.json());  // Middleware to parse JSON

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/products', productController);