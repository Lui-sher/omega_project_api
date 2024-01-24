const express = require('express');
const pokemonTypesRouter = express.Router()
const { getAllPokemonTypes } = require('../controller/pokemonTypes.js')

pokemonTypesRouter.get('/', getAllPokemonTypes); //Cargamos de la api externa todos los datos requeridos para los tipos de pokemon

module.exports = pokemonTypesRouter