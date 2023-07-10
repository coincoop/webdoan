import express from 'express';
import {getBlog, getBlogUrl} from '../controllers/BlogController.js';

const router = express.Router();

// Định nghĩa các router API cho menu
router.get('/blog/all', getBlog);
router.get('/blog/:url', getBlogUrl);
// router.get('/:id', menuController.getMenuById);
// router.post('/', menuController.createMenu);
// router.put('/:id', menuController.updateMenu);
// router.delete('/:id', menuController.deleteMenu);

export default router;
