import express from 'express';
import {getContact} from '../controllers/ContactController.js';

const router = express.Router();

router.get('/contact/status', getContact);
// router.get('/:id', menuController.getMenuById);
// router.post('/', menuController.createMenu);
// router.put('/:id', menuController.updateMenu);
// router.delete('/:id', menuController.deleteMenu);

export default router;
