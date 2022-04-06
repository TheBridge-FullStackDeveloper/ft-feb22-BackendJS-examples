/**
 * @author Alejandro Reyes <alejandroreyes.com> 
 * @exports entries
 * @namespace SQLQueries 
 */

const { Pool } = require('pg');
const pool = new Pool({
    host: 'localhost',
    user: 'alex',
    database: 'demo',
    password: 1234
  })

  /**
  * Descripción de la función: Esta función busca todas las entries de cierto autor por email
  * @memberof SQLQueries 
  * @method getEntriesByEmail 
  * @async 
  * @param {String} email email del autor
  * @return {Object} Devuelve las entries encontradas en un array []
  * @throws {Error} Error de consulta a la BBDD
  */
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

/**
 * Descripción: Esta función devuelve todas las entries del sistema
 * @memberof SQLQueries 
 * @method getAllEntries 
 * @async 
 * @return {Object} Devuelve todas las entries en un array
 * @throws {Error} Error de consulta a la BBDD
 */
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

/**
 * Esta función crea una entry nueva
 * @memberof SQLQueries 
 * @method createEntry
 * @async 
 * @param {Object} entry La nueva entry a crear
 * @return {Number} Devuelve el número de entries creadas 
 * @throws {Error} Error de consulta a la BBDD
 */
const createEntry = async (entry) => {
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

// DELETE 
//UPDATE

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

/*
let newEntry = {
    title:"noticia desde Node",
    content:"va a triunfar esto2",
    email:"alejandru@thebridgeschool.es",
    category:"sucesos"}

createEntry(newEntry)
.then(data=>console.log(data))
*/
