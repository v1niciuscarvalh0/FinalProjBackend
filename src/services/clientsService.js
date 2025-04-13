'use strict';

import ClientsModel from '../models/clientsModel.js';

const ClientsService = {
    getAllClients: async () => {
        return await ClientsModel.getAllClients();
    },
    getClientById: async (id) => {
        return await ClientsModel.getClientById(id);
    },
    createClientForm: async (client) => {
        return await ClientsModel.create(client);
    },
    editClientForm: async (client) => {
        return await ClientsModel.update(client);
    },
    deleteClientForm: async (id) => {
        return await ClientsModel.delete(id);
    }
}

export default ClientsService;