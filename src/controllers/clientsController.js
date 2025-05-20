import ClientsService from "../services/clientsService.js";

const clientsController = {
    index: async (req, res) => {
        const response = await ClientsService.getAllClients();

        res.render('clients', { clients: response });
    },
    getClientForm: async (req, res) => {
        const id = req.params.id;
        if(id) {
            try {
                const response = await ClientsService.getClientById(id);
                res.render('clientForm', { client: response[0] });
            } catch (error) {
                console.log(error);
            }
        } else {
            return res.render('clientForm', { client: []});
        }
    },
    createClient: async (req, res) => {
        const client = req.body;
        try {
            const { insertId } = await ClientsService.createClientForm(client);
            res.redirect(`/clients/${insertId}`);
        } catch (error) {
            console.log(error);
        }
    },
    getClientById: async (req, res) => {
        const id = req.params.id;
        try {
            const response = await ClientsService.getClientById(id);
            res.render('clientsDetail', { client: response });
        } catch (error) {
            console.log(error);
        }
    },
    editClient: async (req, res) => {
        const id = req.params.id;
        const client = req.body;
        client.id = id;

        console.log(client);
        try {
            await ClientsService.editClientForm(client);
            res.redirect(`/clients/${id}`);
        } catch (error) {
            console.log(error);
        } 
    },
    deleteClient: async (req, res) => {
        const id = req.params.id;
        try {
            await ClientsService.deleteClientForm(id);
            res.redirect('/clients');
        } catch (error) {
            console.log(error);
        }
    }
}


export default clientsController;