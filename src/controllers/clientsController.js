import ClientsService from "../services/clientsService.js";

const clientsController = {
    // Retorna todos os clientes como JSON
    getAllClients: async (req, res) => {
        try {
            const clients = await ClientsService.getAllClients();
            res.status(200).json(clients);
        } catch (error) {
            console.error('Erro ao listar clientes:', error);
            res.status(500).json({ message: 'Erro interno do servidor ao listar clientes.', error: error.message });
        }
    },

    // Retorna um cliente específico por ID como JSON
    getClientById: async (req, res) => {
        const id = req.params.id;
        try {
            const client = await ClientsService.getClientById(id);
            if (!client || client.length === 0) {
                return res.status(404).json({ message: 'Cliente não encontrado.' });
            }
            res.status(200).json(client[0]); // Retorna o primeiro (e único) cliente encontrado
        } catch (error) {
            console.error(`Erro ao buscar cliente com ID ${id}:`, error);
            res.status(500).json({ message: 'Erro interno do servidor ao buscar cliente.', error: error.message });
        }
    },

    createClient: async (req, res) => {
        const clientData = req.body; 
        try {
            const { insertId } = await ClientsService.createClientForm(clientData);

            const newClient = await ClientsService.getClientById(insertId);
            res.status(201).json({ message: 'Cliente criado com sucesso!', client: newClient[0] });
        } catch (error) {
            console.error('Erro ao criar cliente:', error);
            // Captura erros específicos, como violação de unicidade (se aplicável)
            if (error.code === 'ER_DUP_ENTRY') { // Exemplo para MySQL
                return res.status(409).json({ message: 'Já existe um cliente com os dados fornecidos (e.g., e-mail duplicado).', error: error.message });
            }
            res.status(500).json({ message: 'Erro interno do servidor ao criar cliente.', error: error.message });
        }
    },

    editClient: async (req, res) => {
        const id = req.params.id;
        const clientData = req.body;
        clientData.id = id; 

        try {
            const affectedRows = await ClientsService.editClientForm(clientData);
            if (affectedRows === 0) { 
                return res.status(404).json({ message: 'Cliente não encontrado para edição.' });
            }
            const updatedClient = await ClientsService.getClientById(id);
            res.status(200).json({ message: 'Cliente atualizado com sucesso!', client: updatedClient[0] });
        } catch (error) {
            console.error(`Erro ao editar cliente com ID ${id}:`, error);
            res.status(500).json({ message: 'Erro interno do servidor ao editar cliente.', error: error.message });
        }
    },

    deleteClient: async (req, res) => {
        const id = req.params.id;
        try {
            const affectedRows = await ClientsService.deleteClientForm(id);
            if (affectedRows === 0) { 
                return res.status(404).json({ message: 'Cliente não encontrado para exclusão.' });
            }
            res.status(200).json({ message: 'Cliente excluído com sucesso!' });
        } catch (error) {
            console.error(`Erro ao deletar cliente com ID ${id}:`, error);
            res.status(500).json({ message: 'Erro interno do servidor ao deletar cliente.', error: error.message });
        }
    }
}

export default clientsController;