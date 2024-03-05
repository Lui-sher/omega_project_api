const express = require("express")
const app = express()

const morgan = require("morgan")
const { 
	pagesRouter,
	pokemonRouter,
	pokemonTypesRouter,
	dBConnectionRouter,
	notFoundPage,
} = require("./constants/constants")

app.use(morgan('dev'))   // nos muestra las caracteristicas de las Solicitudes hechas desde el cliente
app.use(express.json())  //permite a Express analizar y usar el cuerpo(req.body) de la solicitud en formato .JSON 

app.use('/', pagesRouter)
app.use('/api/pokemonTypes', pokemonTypesRouter)
app.use('/api/pokemon', pokemonRouter)
app.use('/dbConnection', dBConnectionRouter)
app.use(notFoundPage)

module.exports = app