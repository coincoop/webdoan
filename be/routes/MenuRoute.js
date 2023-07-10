import express from 'express';
import {getMenu, getMenuUrl} from '../controllers/MenuController.js';

const router = express.Router();

// Định nghĩa các router API cho menu
router.get('/', getMenu);
// router.get('/:id', menuController.getMenuById);
// router.post('/', menuController.createMenu);
// router.put('/:id', menuController.updateMenu);
// router.delete('/:id', menuController.deleteMenu);

export default router;
