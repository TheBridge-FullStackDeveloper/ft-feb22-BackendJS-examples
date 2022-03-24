function hasApiKey(req, res, next) {
    // Buscar en la "BBDD" la API_KEY que se ha mandado
    const API_KEY = 123456;
    // http://localhost:3000/api/entries ---> rechazar
    // http://localhost:3000/api/entries?api_key=123456 ---> pasar
    
    if(req.query.api_key == API_KEY){
        next();
    }else {
        res.status(401).json({message:"Error. No se ha facilitado la api_key"})
    }
}

module.exports = hasApiKey;