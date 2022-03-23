const products = require('../utils/products.js');

const getProduct = async (req,res) => {
    if (req.params.id) {
        const product = await products.getProductById(req.params.id); // Devuelve 1
        res.status(200).render('products', { "products": product }); // Pinta datos en el pug
    } else {
        const allProducts = await products.getAllProducts();
        res.status(200).render('products', {"products":allProducts }); // Pinta datos en el pug
    }
}
const createProduct = async (req,res) => {
    console.log(req.body); // Objeto recibido de producto nuevo
    const newProduct = req.body; // {} nuevo producto a guardar
    // Líneas
    //para guardar 
    // en una BBDD SQL o MongoDB
    const answer = await products.createProduct(newProduct);

    res.status(201).send(`Producto ${answer.title} guardado en el sistema con ID: ${answer.id}`);
}

//const editProduct = ...
//const deleteProduct = ...

const product = {
    getProduct,
    createProduct,
    //editProduct,
    //deleteProduct
}
module.exports = product;