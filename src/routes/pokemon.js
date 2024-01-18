const express = require('express');
const pokemonRouter = express.Router()
const { getAllPokemon } = require('../controller/pokemon.js')

pokemonRouter.get('/', getAllPokemon);

module.exports = pokemonRouter