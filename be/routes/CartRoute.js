import { getAllCart,addToCart,getCartByMakh,addMultipleToCart ,deleteMultipleCart,deleteCart,updateCart,sumThanhtien} from '../controllers/CartController.js';
import express from 'express';

const router = express.Router();

router.get('/cart/all', getAllCart);
router.post('/cart/add', addToCart);
router.get('/cart/:makh', getCartByMakh);
router.delete('/cart/:masp/:makh', deleteCart);
router.delete('/cart/:makh', deleteCart);
router.delete('/cart',deleteMultipleCart);
router.patch('/cart',updateCart);
router.post('/cart/addmulti',addMultipleToCart)
router.get('/cart/thanhtien/:makh',sumThanhtien); 
export default router