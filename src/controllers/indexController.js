'use strict';

import  productsController  from './productsController.js';

const indexController = {
    index:(req, res) => {
        productsController.getAllProducts(req, res);
    }
}


export default indexController;
