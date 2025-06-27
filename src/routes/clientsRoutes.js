'use strinct';

import express from 'express';
const router = express.Router();

import clientsController from '../controllers/clientsController.js';
import { validateClient } from '../middlewares/validateClient.js';
import cache from '../middlewares/cache.js';
import auth from '../middlewares/authMiddleware.js';

router.get('/clients', auth, cache('clients'), clientsController.getAllClients);

router.post('/clients/create', auth, validateClient, clientsController.createClient);

router.get('/clients/:id', auth,clientsController.getClientById);

router.put('/clients/edit/:id', auth, validateClient, clientsController.editClient);

router.delete('/clients/delete/:id', auth,clientsController.deleteClient);


export default router;

