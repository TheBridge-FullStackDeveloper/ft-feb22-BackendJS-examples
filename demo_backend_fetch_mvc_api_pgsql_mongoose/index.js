// Módulos externos
const express = require('express'); // Importando módulo NPM (libería)

// Rutas
const entryRouter = require('./routes/entry');


const productRouter = require('./routes/products');
const productApiRouter = require('./routes/productsApi');

const app = express() // Inicializa el servidor. App es un bjeto que representa el server
const port = 3000

// Motor de vistas PUG
app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json()); // Para habilitar recepción de datos JSON en una request

// Rutas
app.use("/",productRouter);// WEB products
app.use("/api",entryRouter);// API
app.use("/api",productApiRouter);// API products

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})