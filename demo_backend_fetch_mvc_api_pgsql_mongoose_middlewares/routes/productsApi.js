//Rutas para la API
const express = require('express');
const router = express.Router();
const products = require('../controllers/productsApi');
const hasApiKey = require('../middlewares/hasApiKey');

/*************SECCIÓN API PRODUCTOS**********/
// /products/3
// /products
router.get('/products/:id?',products.getProduct);
router.post('/products',hasApiKey,products.createProduct);

module.exports = router;
