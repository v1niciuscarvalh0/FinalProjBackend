'use strict';

import productsService from '../services/productsService.js'

const productsController = {
    getProductForm: async(req, res) => {
        const id = req.params.id;
        if(id) {
            try {
                const response = await productsService.getProductById(id);
                res.render('productForm', { product: response[0] });
            } catch (error) {
                console.log(error);
            }
        } else {
            return res.render('productForm', { product: []});
        }
    },

    getAllProducts: async (req, res) => {
        try {
            const response = await productsService.getAllProducts();
            res.render('products', { products: response });
        } catch (error) {
            console.log(error);
        }
    },

    getProductById: async (req, res) => {
        const id = req.params.id;
        try {
            const response = await productsService.getProductById(id);
            res.render('productDetail', { product: response });
        } catch (error) {
            console.log(error);
        }
    },

    createProduct: async (req, res) => {
        const product = req.body;
        try {
            const {insertId} = await productsService.createProductForm(product);
            res.redirect(`/products/${insertId}`);
        } catch (error) {
            console.log(error);
        }

    }, 
    editProduct: async (req, res) => {
        const id = req.params.id;
        const product = req.body;
        product.id = id;
        try {
            await productsService.editProductForm(product);
            res.redirect(`/products/${id}`);
        } catch (error) {
            console.log(error);
        }
    },

    deleteProduct: async (req, res) => {
        const id = req.params.id;
        try {
            await productsService.deleteProductForm(id);
            res.redirect('/');
        } catch (error) {
            console.log(error);
        }
    }
}
export default productsController;