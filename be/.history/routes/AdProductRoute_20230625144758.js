import express from "express";

import { getProducts, getProductById, createProduct, updateProduct, deleteProduct, updateStatusProduct } from "../controllers/AdProductController.js";
const router = express.Router();

router.post("/admin/adproducts",createProduct);
router.get('/admin/adproducts', getProducts);
router.get('/admin/adproducts/:id', getProductById);
router.patch('/admin/adproducts/:id', updateProduct);
router.delete('/admin/adproducts/:id', deleteProduct);
router.put("/admin/adproducts/:id", updateStatusProduct);
export default router
