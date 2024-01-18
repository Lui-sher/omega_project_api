const express = require('express');
const pokemonTypesRouter = express.Router()
const { getAllPokemonTypes } = require('../controller/pokemonTypes.js')

pokemonTypesRouter.get('/', getAllPokemonTypes);

module.exports = pokemonTypesRouter