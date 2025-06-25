'use strict';

import productsService from '../services/productsService.js';

const productsController = {
    getAllProducts: async (req, res) => {
        try {
            const products = await productsService.getAllProducts();
            res.status(200).json(products);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro interno do servidor ao listar produtos.', error: error.message });
        }
    },

    getProductById: async (req, res) => {
        const id = req.params.id;
        try {
            const product = await productsService.getProductById(id);
            if (!product || product.length === 0) {
                return res.status(404).json({ message: 'Produto não encontrado.' });
            }
            res.status(200).json(product[0]);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro interno do servidor ao buscar produto.', error: error.message });
        }
    },

    createProduct: async (req, res) => {
        const productData = req.body;
        try {
            const { insertId } = await productsService.createProductForm(productData);
            const newProduct = await productsService.getProductById(insertId);
            res.status(201).json({ message: 'Produto criado com sucesso!', product: newProduct[0] });
        } catch (error) {
            console.error(error);
            if (error.code === 'ER_DUP_ENTRY') {
                return res.status(409).json({ message: 'Já existe um produto com os dados fornecidos.', error: error.message });
            }
            res.status(500).json({ message: 'Erro interno do servidor ao criar produto.', error: error.message });
        }
    },

    editProduct: async (req, res) => {
        const id = req.params.id;
        const productData = req.body;
        productData.id = id;
        try {
            const affectedRows = await productsService.editProductForm(productData);
            if (affectedRows === 0) {
                return res.status(404).json({ message: 'Produto não encontrado para edição.' });
            }
            const updatedProduct = await productsService.getProductById(id);
            res.status(200).json({ message: 'Produto atualizado com sucesso!', product: updatedProduct[0] });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro interno do servidor ao editar produto.', error: error.message });
        }
    },

    deleteProduct: async (req, res) => {
        const id = req.params.id;
        try {
            const affectedRows = await productsService.deleteProductForm(id);
            if (affectedRows === 0) {
                return res.status(404).json({ message: 'Produto não encontrado para exclusão.' });
            }
            res.status(200).json({ message: 'Produto excluído com sucesso!' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro interno do servidor ao deletar produto.', error: error.message });
        }
    }
};

export default productsController;