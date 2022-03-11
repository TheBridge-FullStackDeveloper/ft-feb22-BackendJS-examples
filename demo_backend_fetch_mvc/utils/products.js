const fetch = require('node-fetch')

const getProductById = async (id) => {
    try {
        let response = await fetch(`https://fakestoreapi.com/products/${id}`); //{}
        let products = await response.json(); //{}
        return [products];
    }
    catch (error) {
        console.log(`ERROR: ${error.stack}`);
        return [];
    }
}
const getAllProducts = async () => {
    try {
        let response = await fetch(`https://fakestoreapi.com/products`); // []
        let products = await response.json(); // []
        return products;
    }
    catch (error) {
        console.log(`ERROR: ${error.stack}`);
        return [];
    }

}
const createProduct = async (product) => {
    try{
        let response = await fetch('https://fakestoreapi.com/products', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        })
        let answer = await response.json(); // objeto de vuelta de la petición
        return answer; // {id,title,price,descrition}
    }
    catch (error) {
        console.log(`ERROR: ${error.stack}`);
        return {};
    }
}

const product = {
    getProductById,
    getAllProducts,
    createProduct
}
module.exports = product;


// *******Pruebas de ejecución********
//getAllProducts().then(data=>console.log(data))
//getProductById(5).then(data=>console.log(data))
/*
const newProduct = {
    title: 'test product',
    price: 13.5,
    description: 'lorem ipsum set',
    image: 'https://i.pravatar.cc',
    category: 'electronic'
}
createProduct(newProduct).then(data=>console.log(data))
*/