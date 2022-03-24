const db = require('../models/entry.js');

const getEntries = async (req,res) => {
    // /entries?email=alejandru@thebridgeschool.es
    if (req.query.email) {
        const entries = await db.getEntriesByEmail(req.query.email); // Devuelve 1
        res.status(200).json(entries); // devuelve JSON respuesta
    // /entries
    } else {
        const entries = await db.getAllEntries();
        res.status(200).json(entries) // Pinta datos en el pug
    }
}

const createEntry = async (req,res) => {
    console.log(req.body); // Objeto recibido de entry nueva
    const newEntry = req.body; // {} nuevo producto a guardar
    // Líneas para guardar en una BBDD SQL
    const response = await db.createEntry(newEntry);
    console.log(response);
    res.status(201).json({"items_created":response});
}


const entries = {
    getEntries,
    createEntry
}
module.exports = entries;