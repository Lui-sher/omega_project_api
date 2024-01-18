const express = require("express")
const app = express()
const { notFoundPage } = require("./controller/pokemon.js")
const  pagesRouter  = require("./routes/pages.js")
const morgan = require("morgan")

app.use(morgan('dev'))

app.use('/', pagesRouter)

app.use(notFoundPage)

module.exports = app 