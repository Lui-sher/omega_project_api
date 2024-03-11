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

//Midlewears
app.use(morgan('Method: :method \nURL: :url \nDate: :date[web] \nIP: :remote-addr \nAlgo: :remote-user  \nResponse Time: :response-time ms '))   // nos muestra las caracteristicas de las Solicitudes hechas por el cliente
app.use(express.json())  //permite a Express analizar y usar el cuerpo(req.body) de la solicitud en formato .JSON 
//Routes
app.use('/', pagesRouter)
app.use('/api/pokemonTypes', pokemonTypesRouter)
app.use('/api/pokemon', pokemonRouter)
app.use('/dbConnection', dBConnectionRouter)
app.use(notFoundPage)

module.exports = app