'use strinct';
import express from 'express';
const router = express.Router();
import clientsController from '../controllers/clientsController.js';
import { validateClient } from '../middlewares/validateClient.js';
import cache from '../middlewares/cache.js';

router.get('/clients', cache('clients'), clientsController.index);

router.get('/clients/create',clientsController.getClientForm);
router.post('/clients/create', validateClient, clientsController.createClient);

router.get('/clients/:id',clientsController.getClientById);
router.post('/clients/edit/:id', validateClient, clientsController.editClient);

router.get('/clients/edit/:id',clientsController.getClientForm);

router.get('/clients/delete/:id',clientsController.deleteClient);


export default router;

