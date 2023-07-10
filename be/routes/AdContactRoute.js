import express from "express";

import { getContact, getContactById, createContact, updateContact, deleteContact, updateStatusContact } from "../controllers/AdContactController.js";
const router = express.Router();

router.post("/admin/contact",createContact);
router.get('/admin/contact', getContact);
router.get('/admin/contact/:id', getContactById);
router.patch('/admin/contact/:id', updateContact);
router.delete('/admin/contact/:id', deleteContact);
router.put("/admin/contact/:id", updateStatusContact);
export default router
