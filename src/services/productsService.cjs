const productsModel = require('../models/productsModel.cjs');
const cache = require('../../configs/cache.cjs');

const productsService = {
    getAllProducts: async () => {
        const products = await productsModel.getAllProducts();
        cache.set('products', products, 30);
        return products;
    },
    getProductById: async (id) => {
        return await productsModel.getProductById(id);
    },
    createProductForm: async (product) => {
        return await productsModel.create(product);
    },
    editProductForm: async (product) => {
        return await productsModel.update(product);
    },
    deleteProductForm: async (id) => {
        return await productsModel.delete(id);
    }
};

module.exports = productsService;