
const express = require('express');
const router = express.Router();

const clientsController = require('../controllers/clientsController.cjs');
const validateClient = require('../middlewares/validateClient.cjs'); 
const cache = require('../middlewares/cache.cjs'); 
const auth = require('../middlewares/authMiddleware.cjs'); 

router.get('/clients', auth, cache('clients'), clientsController.getAllClients);

router.post('/clients/create', auth, validateClient, clientsController.createClient);

router.get('/clients/:id', auth, clientsController.getClientById);

router.put('/clients/edit/:id', auth, validateClient, clientsController.editClient);

router.delete('/clients/delete/:id', auth, clientsController.deleteClient);

module.exports = router;