import {getReviewByMasp,updateReview,addReview,deleteReview} from '../controllers/ReviewController.js';
import express from 'express';

const router = express.Router();

router.post('/review/add', addReview);
router.get('/review/:url', getReviewByMasp);
router.patch('/review',updateReview);
router.delete('/review/delete', deleteReview);
export default router