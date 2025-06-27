const ClientsModel = require('../models/clientsModel.cjs');
const cache = require('../../configs/cache.cjs');

const ClientsService = {
    getAllClients: async () => {
        const clients = await ClientsModel.getAllClients();
        cache.set('clients', clients, 30);
        return clients;        
    },
    getClientById: async (id) => {
        return await ClientsModel.getClientById(id);
    },
    createClientForm: async (client) => {
        return await ClientsModel.create(client);
    },
    editClientForm: async (client) => {
        cache.del('clients');
        return await ClientsModel.update(client);
    },
    deleteClientForm: async (id) => {
        cache.del('clients');
        return await ClientsModel.delete(id);
    }
};

module.exports = ClientsService;