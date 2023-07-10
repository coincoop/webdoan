import express from 'express';
import {getProduct, getProductUrl, getProductsByUrl,getProductById, getProductSale,getProductByIdAccCart} from '../controllers/ProductController.js';


const router = express.Router();

// Định nghĩa các router API cho menu
router.get('/product', getProduct);
router.get('/:url', getProductUrl);
router.get('/categories/:url', getProductsByUrl);
router.get('/product/:id', getProductById);
router.get('/product/acccart/:id', getProductByIdAccCart);
router.get('/products/productsale', getProductSale);
export default router;
