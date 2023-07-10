import express from "express";
import { getMenus, getMenuById, createMenu, updateMenu, deleteMenu } from "../controllers/AdMenuController.js";

const router = express.Router();

router.get('/admin/admenus', getMenus);
router.get('/admin/admenus/:id', getMenuById);
router.post('/admin/admenus', createMenu);
router.patch('/admin/admenus/:id', updateMenu);
router.delete('/admin/admenus/:id', deleteMenu);

export default router