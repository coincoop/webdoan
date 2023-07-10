import express from "express";

import { getReview, getReviewById, createReview, updateReview, deleteReview, getReviewDashBoard, updateReviewDashboard } from "../controllers/AdReviewController.js";
const router = express.Router();

router.post("/admin/review",createReview);
router.get('/admin/review', getReview);
router.get('/admin/review/dashboard', getReviewDashBoard);
router.patch("/admin/review/dashboard/:makh/:masp", updateReviewDashboard);
router.get('/admin/review/:id', getReviewById);
router.patch('/admin/review/:id', updateReview);
router.delete('/admin/review/:makh&:masp', deleteReview);

export default router
