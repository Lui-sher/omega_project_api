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

app.use(morgan('dev'))

app.use('/', pagesRouter)
app.use('/api/pokemonTypes', pokemonTypesRouter)
app.use('/api/pokemon', pokemonRouter)
app.use('/dbConnection', dBConnectionRouter)
app.use(notFoundPage)

module.exports = app