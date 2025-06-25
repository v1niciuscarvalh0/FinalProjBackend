import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// roda servidor

app.listen(process.env.PORT, () => {
    console.log(`Express escutando na porta http://localhost:${process.env.PORT}`);
});



// importa rotas
import indexRoutes from './src/routes/indexRoutes.js';
import productsRoutes from './src/routes/productsRoutes.js';
import clientsRouter from './src/routes/clientsRoutes.js';
import authRouter from './src/routes/authRoutes.js';

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
