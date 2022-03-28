const express = require('express');
const router = express.Router();

const products = require('../controllers/products');
const hasApiKey = require('../middlewares/hasApiKey');

const cowsay = require("cowsay"); // Importando módulo NPM (libería)r

// Módulo propio
//const calculator = require("./modules/calculator.js");
const calculator = require("../modules/calculator");

/*************SECCIÓN PRODUCTOS**********/


// Endpoints/ruta/entry point
//http://127.0.0.1:3000/
// http://localhost:3000/
router.get('/', (req, res) => {

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


// /products/3
// /products
router.get('/products/:id?',products.getProduct);
router.post('/products',hasApiKey, products.createProduct);

module.exports = router;
