const express = require('express');
const router = express.Router();

const entries = require('../controllers/entry');
const hasApiKey = require('../middlewares/hasApiKey');

/***********SECCIÓN ENTRIES**********/
// GET entries by Email
// GET http://localhost:3000/entries?email=alejandru@thebridgeschool.es

// GET all entries
// GET http://localhost:3000/api/entries
router.get('/entries',entries.getEntries);

// POST --> Create Entry
// POST http://localhost:3000/api/entries --> endpoint para mandar objeto entry nueva
router.post('/entries',hasApiKey,entries.createEntry);

// DELETE
// router.delete('/entries',entries.deleteEntries);
// UPDATE
//router.put('/entries',entries.updateEntries);

module.exports = router;