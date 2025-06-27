const db = require('../../configs/database.cjs');

const userModel = {
    async create(user) {
        const [result] = await db.execute('INSERT INTO usuarios (usuario, senha) VALUES (?, ?)', [user.email, user.password]);
        return result;
    },

    async getUserByEmail(email) {
        console.log(email);
        const [result] = await db.execute('SELECT * FROM usuarios WHERE usuario = ?', [email]);
        return result;
    },

    async setUsertoken(id, token) {
        const [result] = await db.execute('UPDATE usuarios SET token = ? WHERE usuarios.id = ?', [token, id]);
        return result;
    }
};

module.exports = userModel;