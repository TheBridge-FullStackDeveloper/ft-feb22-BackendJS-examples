const { Pool } = require('pg');
const pool = new Pool({
    host: 'localhost',
    user: 'alex',
    database: 'demo',
    password: 1234
  })

const getEntriesByEmail = async (email) => {
    let client,result;
    try{
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(`
                SELECT e.title,e.content,e.date,e.category,a.name,a.surname,a.image
                FROM entries AS e
                INNER JOIN authors AS a
                ON e.id_author=a.id_author
                WHERE a.email=$1
                ORDER BY e.title;`,[email])
        result = data.rows
    }catch(err){
        console.log(err);
        throw err;
    }finally{
        client.release();    
    }
    return result
}

const getAllEntries = async () => {
    let client,result;
    try{
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(`SELECT * FROM entries;`)
        result = data.rows
    }catch(err){
        console.log(err);
        throw err;
    }finally{
        client.release();    
    }
    return result
}



const createEntry = async (entry,email) => {
    const {title,content,email,category} = entry;
    let client,result;
    try{
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(`INSERT INTO entries(title,content,id_author,category) 
                                    VALUES ($1,$2,
                                    (SELECT id_author FROM authors WHERE email=$3),$4)`
                                    ,[title,content,email,category])
        result = data.rowCount
    }catch(err){
        console.log(err);
        throw err;
    }finally{
        client.release();    
    }
    return result
}

const entries = {
    getEntriesByEmail,
    getAllEntries,
    createEntry,
    //deleteEntry
    //updateEntry
}

module.exports = entries;


// Pruebas
/*
    getEntriesByEmail("birja@thebridgeschool.es")
    .then(data=>console.log(data))
*/
/*
getAllEntries()
.then(data=>console.log(data))
*/


let newEntry = {title:"noticia desde Node",content:"va a triunfar esto",category:"sucesos"}

createEntry(newEntry,"alejandru@thebridgeschool.es")
.then(data=>console.log(data))

