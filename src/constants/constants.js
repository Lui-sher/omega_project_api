const  pagesRouter  = require("../routes/pages.js")
const  pokemonRouter  = require("../routes/pokemon.js")
const  pokemonTypesRouter  = require("../routes/pokemonTypes.js")
const dBConnectionRouter = require("../routes/dbConnection.js")
const { notFoundPage } = require("../controller/pages.js")


module.exports = {
    pagesRouter,
    pokemonRouter,
    pokemonTypesRouter,
    dBConnectionRouter,
    notFoundPage,
}