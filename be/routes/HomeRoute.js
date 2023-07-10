import express from 'express';
import {getHome} from '../controllers/HomeController.js';

const router = express.Router();

// Định nghĩa các router API cho menu
router.get('/home/status', getHome);
// router.get('/:id', menuController.getMenuById);
// router.post('/', menuController.createMenu);
// router.put('/:id', menuController.updateMenu);
// router.delete('/:id', menuController.deleteMenu);

export default router;
