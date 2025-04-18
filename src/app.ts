import express from "express";

const app = express();
app.use(express.json());  // Middleware to parse JSON
export default app;  // Export app for use in index.ts