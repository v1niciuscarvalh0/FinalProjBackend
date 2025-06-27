const db = require('../../configs/database.cjs');

const clientsModel = {    
    getAllClients: async () => {
        const [rows] = await db.execute("SELECT * FROM clientes");
        return rows;
    },
    getClientById: async (id) => {
        const [result] = await db.execute("SELECT * FROM clientes WHERE id = ?", [id]);
        return result;
    },
    update: async (client) => {
        const [result] = await db.execute("UPDATE clientes SET nome = ?, sobrenome = ?, email = ?, idade = ? WHERE id = ?",
            [client.nome, client.sobrenome, client.email, client.idade, client.id]);
        return result;
    },
    create: async (client) => {
        const [result] = await db.execute("INSERT INTO clientes (nome, sobrenome, email, idade) VALUES(?, ?, ?, ?)",
            [client.nome, client.sobrenome, client.email, client.idade]);
        return result;
    },
    delete: async (id) => {
        const [result] = await db.execute("DELETE FROM clientes WHERE id = ?", [id]);
        return result;
    }
}

module.exports = clientsModel;