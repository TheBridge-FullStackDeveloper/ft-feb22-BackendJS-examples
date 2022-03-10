// Módulos externos
const express = require('express'); // Importando módulo NPM (libería)
const cowsay = require("cowsay"); // Importando módulo NPM (libería)r
const fetch = require('node-fetch');

// Módulo propio
//const calculator = require("./modules/calculator.js");
const calculator = require("./modules/calculator");
const { render } = require('pug');

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
//http://127.0.0.1:3000/otraditinta
// http://localhost:3000/otradistinta
app.get('/otradistinta', (req, res) => {

    const msj = cowsay.say({
        text: "Hola desde otra ruta!!!!!! La resta de 10-5 es:" + calculator.sub(10, 5),
        e: "^^",
        T: "U "
    })
    console.log(msj)
    res.send(msj)
})

//http://localhost:3000/pokemon/pikachu
//http://localhost:3000/pokemon/ditto
//http://localhost:3000/pokemon/0
//http://localhost:3000/pokemon/
app.get('/pokemon/:name?', (req, res) => {

    console.log(req.params); // Objeto de petición HTTP
    console.log(typeof parseInt(req.params.name));
    let txt = "";
    if (req.params.name) {
        isNaN(req.params.name) ? // Nombre pokemon
            txt = `Hola. Toma a ${req.params.name}!!`
            : // ID pokemon
            txt = `Hola. Toma al pokemon con ID ${req.params.name}!!`
    } else { // nada
        txt = "Pokemon!! 150 o más....";
    }

    const msj = cowsay.say({
        text: txt,
        e: "--",
        T: "u"
    })
    console.log(msj)
    let owner = "Ash Ketchum";
    //res.send(msj)
    res.render('pokemon.pug', { msj, owner })
})

// /products/3
// /products
app.get('/products/:id?', async (req, res) => {

    if (req.params.id) {
        try {
            let response = await fetch(`https://fakestoreapi.com/products/${req.params.id}`); //{}
            let products = await response.json(); //{}
            res.render('products', { "products": [products] }); // Pinta datos en el pug
        }
        catch (error) {
            console.log(`ERROR: ${error.stack}`);
        }
    } else {
        try {
            let response = await fetch(`https://fakestoreapi.com/products`); // []
            let products = await response.json(); // []
            res.render('products', { products }); // Pinta datos en el pug
        }
        catch (error) {
            console.log(`ERROR: ${error.stack}`);
        }
    }
})

app.post('/products', async (req, res) => {
    console.log(req.body); // Objeto recibido de producto nuevo
    const newProduct = req.body; // {} nuevo producto a guardar

    // Líneas
    //para guardar 
    // en una BBDD SQL o MongoDB

    let response = await fetch('https://fakestoreapi.com/products', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newProduct)
    })
    let answer = await response.json(); // objeto de vuelta de la petición
    console.log(answer);

    res.send(`Producto ${answer.title} guardado en el sistema con ID: ${answer.id}`);
})

app.post('/', (req, res) => {
    const msj = "Has enviado un POST";
    console.log(msj);
    res.send(msj)
})

app.delete('/', (req, res) => {
    const msj = "Has enviado un DELETE";
    console.log(msj);
    res.send(msj)
})



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})