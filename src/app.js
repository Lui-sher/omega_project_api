const express = require("express")
const app = express()
const morgan = require("morgan")
const { 
	pagesRouter,
	pokemonRouter,
	pokemonTypesRouter,
	notFoundPage
} = require("./constants/constants")

app.use(morgan('dev'))

app.use('/', pagesRouter)
app.use('/api/pokemon', pokemonRouter)
app.use('/api/pokemonTypes', pokemonTypesRouter)
app.use(notFoundPage)

module.exports = app 