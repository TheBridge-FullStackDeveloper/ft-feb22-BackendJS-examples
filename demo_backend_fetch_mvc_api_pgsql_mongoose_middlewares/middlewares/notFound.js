function notFound(req,res,next){
    res.status(404).json({message:"Ruta inexistente",code:404})
}

module.exports = notFound;