const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController.cjs');
const validateProduct  = require('../middlewares/validateProduct.cjs'); // Destructuring for named export

router.get('/products', productsController.getAllProducts);

router.post('/products/create', validateProduct, productsController.createProduct);

//router.get('/products/:id', productsController.getProductById);

//router.put('/products/edit/:id', validateProduct, productsController.editProduct);

//router.delete('/products/delete/:id', productsController.deleteProduct);

module.exports = router;