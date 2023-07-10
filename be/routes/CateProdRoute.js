import express from 'express';
import {getCateProd} from '../controllers/CateProdController.js';

const router = express.Router();

router.get('/cateprod/pro', getCateProd);

export default router;
