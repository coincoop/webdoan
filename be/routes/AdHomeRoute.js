import express from "express";
import { getHome, getHomeById,  createHome, updateHome, deleteHome, updateStatusHome} from "../controllers/AdHomeController.js";

const router = express.Router();

router.get('/admin/home', getHome);
router.get('/admin/home/:id', getHomeById);
router.post('/admin/home', createHome);
router.patch('/admin/home/:id', updateHome);
router.delete('/admin/home/:id', deleteHome);
router.put("/admin/home/:id", updateStatusHome);
export default router