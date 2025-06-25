'use strinct';
import express from 'express';
const router = express.Router();
import productsController from '../controllers/productsController.js'
import { validateProduct } from '../middlewares/validateProduct.js';

router.get('/products', productsController.getAllProducts);

router.post('/products/create', validateProduct, productsController.createProduct);

router.get('/products/:id', productsController.getProductById);

router.put('/products/edit/:id', validateProduct, productsController.editProduct);

router.delete('/products/delete/:id', productsController.deleteProduct);

export default router;