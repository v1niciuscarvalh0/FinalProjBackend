'use strict';

import productsModel from '../models/productsModel.js';

const productsService = {
    getAllProducts: async () => {
        return await productsModel.getAllProducts();
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
}

export default productsService;