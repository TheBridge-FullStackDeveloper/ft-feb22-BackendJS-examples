// Módulos externos
const express = require('express'); // Importando módulo NPM (libería)
const cowsay = require("cowsay"); // Importando módulo NPM (libería)r

// Módulo propio
//const calculator = require("./modules/calculator.js");
const calculator = require("./modules/calculator");
const products = require('./controllers/products');


const app = express() // Inicializa el servidor. App es un bjeto que representa el server
const port = 3000

// Motor de vistas PUG
app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json()); // Para habilitar recepción de datos JSON en una request

// Endpoints/ruta/entry point
//http://127.0.0.1:3000/
// http://localhost:3000/
app.get('/', (req, res) => {

    const msj = cowsay.say({
        text: "Hola desde la Home!!!!!! 2+2 son:" + calculator.sum(2, 2),
        e: "oO",
        T: "U "
    })
    console.log(msj)
    //res.send(msj) // Devolviendo la respuesta HTTP

    const breakfast = ["tortilla", "barrita", "cafe", "zumo de naranja"]

    res.render('home.pug', { msj, breakfast })
})

/*************SECCIÓN PRODUCTOS**********/
// /products/3
// /products
app.get('/products/:id?',products.getProduct);
app.post('/products', products.createProduct);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})