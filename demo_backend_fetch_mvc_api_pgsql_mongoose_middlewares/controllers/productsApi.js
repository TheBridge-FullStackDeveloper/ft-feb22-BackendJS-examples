const Product = require("../models/products"); // BBDD
// http://localhost:3000/api/products/2
const getProduct = async (req,res) => {
    try{
        if (req.params.id) {
            const product = await Product.find({id:req.params.id},'title price id -_id');
            res.status(200).json(product); //Devuelve el producto
        } else {
            const allProducts = await Product.find({},'title price id -_id');
            res.status(200).json(allProducts); // Devuelve todos los datos
        }
    }catch(err){
        res.status(400).json({message:err});
    }
}

const createProduct = async (req,res) => {
    console.log(req.body); // Objeto recibido de producto nuevo
    const newProduct = new Product(req.body); // {} nuevo producto a guardar
    // Líneas
    //para guardar 
    // en una BBDD SQL o MongoDB
    try{
        const response = await newProduct.save();
        res.status(201).json({message:`Producto ${response.title} guardado en el sistema con ID: ${response.id}`});
    }catch(err){
        res.status(400).json({message:err});
    }
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

