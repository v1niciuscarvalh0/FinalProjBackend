const express = require('express');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));




// roda servidor
app.listen(process.env.PORT, () => {
    console.log(`Express escutando na porta http://localhost:${process.env.PORT}`);
});


// importa rotas
const indexRoutes = require('./src/routes/indexRoutes.cjs');
const productsRoutes = require('./src/routes/productsRoutes.cjs');
const clientsRouter = require('./src/routes/clientsRoutes.cjs');
const authRouter = require('./src/routes/authRoutes.cjs');

// usa as rotas
app.use(authRouter);
app.use(indexRoutes);
app.use(clientsRouter);
app.use(productsRoutes);

// define a template engine
app.set('view engine', 'pug');

app.set('views', [
    path.join(__dirname, 'src', 'views/clients'),
    path.join(__dirname, 'src', 'views/products'),
    path.join(__dirname, 'src', 'views/includes')
]);
// Configurar o Express para servir arquivos estáticos (CSS, imagens, JS)
app.use(express.static(path.join(__dirname, 'public')));