'use strinct';
import express from 'express';
const router = express.Router();
import productsController from '../controllers/productsController.js'
import { validateProduct } from '../middlewares/validateProduct.js';

router.get('/products/create',  productsController.getProductForm);
router.post('/products/create', validateProduct, productsController.createProduct);

router.get('/products/:id', productsController.getProductById);

router.get('/products/edit/:id', productsController.getProductForm);
router.post('/products/edit/:id', validateProduct, productsController.editProduct);

router.get('/products/delete/:id', productsController.deleteProduct);

export default router;