const express = require('express');
const dBConnectionRouter = express.Router()
const { dbSetupConnection } = require('../controller/dbSetupConnection')

//ruta para super usuario 
dBConnectionRouter.get('/:code', dbSetupConnection); //segun el code enviado podemos resincronizar o borrar todas las tablas en la BD

module.exports = dBConnectionRouter
