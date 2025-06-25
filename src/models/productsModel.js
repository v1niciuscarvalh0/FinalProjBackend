import db from '../../configs/database.js';

const productsModel = {
    getAllProducts: async () => {
        const [rows] = await db.execute("SELECT * FROM produtos");
        return rows;
    },
    create: async (product) => {
        
        console.log(product)
        const [result] = await db.execute("INSERT INTO produtos (nome, descricao, preco, data_atualizado) VALUES(?, ?, ?, now())",
            [product.nome, product.descricao, product.preco]);
        return result;
    },
    getProductById: async (id) => {
        const [result] = await db.execute("SELECT * FROM produtos WHERE id = ?", [id]);
        return result;
    },
    update: async (product) => {
        const [result] = await db.execute("UPDATE produtos SET nome = ?, descricao = ?, preco = ?, data_atualizado = now() WHERE id = ?",
            [product.nome, product.descricao, product.preco, product.id]);
        return result;
    },
    delete: async (id) => {
        const [result] = await db.execute("DELETE FROM produtos WHERE id = ?", [id]);
        return result;
    }

}

export default productsModel;