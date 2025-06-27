const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userModel = require('../models/userModel.cjs');

const authController = {

    async tokenGenerate(id) {
        return jwt.sign({ "id": id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN,
        });
    },

    async invalidateToken(id) {
        const result = await userModel.setUsertoken(id, null);
        if (result.affectedRows === 0) {
            throw new Error('Erro ao inválidar token');
        }
    },

    async createUser(req, res) {
        try {
            let { name, email, password } = req.body;
            const userExist = await userModel.getUserByEmail(email);

            if (userExist.length > 0) {
                return res.status(400).json({ mensage: 'Email já em uso.' });
            }

            password = await bcrypt.hash(password, 10);
            const { insertId } = await userModel.create({ name, email, password });
            const token = await authController.tokenGenerate(insertId.id || insertId);

            res.status(201).json({
                mensage: 'Usuário registrado com sucesso',
                token,
                user: { id: insertId.id || insertId, name, email },
            });

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro interno do servidor ao registrar usuário.', error: error.message });
        }
    },

    async login(req, res) {
        let { email, password } = req.body;
        const user = await userModel.getUserByEmail(email);
        console.log(user)
        if (user.length === 0) {
            return res.status(401).json({ message: 'Usuário não encontrado' });
        }

        const passwordIsValid = await bcrypt.compare(password, user[0].senha);

        if (!passwordIsValid) {
            return res.status(401).json({ message: "Senha incorreta" });
        }

        const token = await authController.tokenGenerate(user[0].id);
        await userModel.setUsertoken(user[0].id, token);
        return res.status(200).json({ token });
    },

    async logout(req, res) {
        try {
            const token = req.headers.authorization?.split(' ')[1];

            if (!token) {
                return res.status(401).json({ mensagem: 'Token não fornecido' });
            }

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            await authController.invalidateToken(decoded.id);

            return res.status(200).json({ mensagem: 'Logout realizado com sucesso' });
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                return res.status(401).json({ mensagem: 'Token expirado. Faça login novamente.' });
            }
            console.error(error);
            return res.status(401).json({ mensagem: 'Token inválido ou expirado' });
        }
    }
};

module.exports = authController;