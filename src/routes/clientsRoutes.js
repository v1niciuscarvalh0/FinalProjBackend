'use strinct';

import express from 'express';
const router = express.Router();

import clientsController from '../controllers/clientsController.js';
import { validateClient } from '../middlewares/validateClient.js';
import cache from '../middlewares/cache.js';

router.get('/clients', cache('clients'), clientsController.getAllClients);

router.post('/clients/create', validateClient, clientsController.createClient);

router.get('/clients/:id',clientsController.getClientById);

router.put('/clients/edit/:id', validateClient, clientsController.editClient);

router.delete('/clients/delete/:id',clientsController.deleteClient);


export default router;

