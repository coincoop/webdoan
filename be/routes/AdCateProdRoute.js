import express from "express";

import { getCateProd, getCateProdById, createCateProd, updateCateProd, deleteCateProd, updateCateProdKeo } from "../controllers/AdCateProdController.js";
const router = express.Router();

router.post("/admin/cateProd",createCateProd);
router.get('/admin/cateProd', getCateProd);
router.put('/admin/cateProd/:id', updateCateProdKeo);
router.get('/admin/cateProd/:id', getCateProdById);
router.patch('/admin/cateProd/:id', updateCateProd);
router.delete('/admin/cateProd/:id', deleteCateProd);

export default router
