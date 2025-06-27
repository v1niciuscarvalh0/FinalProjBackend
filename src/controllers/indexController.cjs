const productsController = require('./productsController.cjs');

const indexController = {
    index: (req, res) => {
        productsController.getAllProducts(req, res);
    }
};

module.exports = indexController;