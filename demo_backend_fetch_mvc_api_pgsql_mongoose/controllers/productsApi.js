const paraNada = require('../utils/dbMongo.js');

const Product = require("../models/products"); // BBDD
// http://localhost:3000/api/products/2
const getProduct = async (req,res) => {
    if (req.params.id) {
        const product = await Product.find({id:req.params.id});
        res.status(200).json(product); //Devuelve el producto
    } else {
        const allProducts = await Product.find({});
        res.status(200).json(allProducts); // Devuelve todos los datos
    }
}

const createProduct = async (req,res) => {
    console.log(req.body); // Objeto recibido de producto nuevo
    const newProduct = new Product(req.body); // {} nuevo producto a guardar
    // Líneas
    //para guardar 
    // en una BBDD SQL o MongoDB
    const response = await newProduct.save();
    
    res.status(201).json({message:`Producto ${response.title} guardado en el sistema con ID: ${response.id}`});
}


//const editProduct = ...
//const deleteProduct = ...

const product = {
    getProduct,
    createProduct
    //editProduct,
    //deleteProduct
}
module.exports = product;

