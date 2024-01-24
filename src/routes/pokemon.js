const express = require('express')
const pokemonRouter = express.Router()
const {
  getPokemons,
  getAllPokemonDb,
  getOnePokemon,
  deletePokemonById, 
  deletePokemonByDexNum, 
} = require('../controller/pokemon.js')

pokemonRouter.get('/get', getPokemons)           //obtenemos por defecto 20 pokemon de la api externa
pokemonRouter.get('/get/:cantidad', getPokemons) //obtenemos de la api externa la cantidad de pokemon solicitada
pokemonRouter.get('/db', getAllPokemonDb)        //obtenemos todos los datos disponibles en la base de datos
pokemonRouter.get('/db/:dexNum', getOnePokemon)  //obtenemos el pokemon con numero de pokedex solicitado
pokemonRouter.delete('/deleteId/:id', deletePokemonById) //borramos de la base de datos el pokemon con la id enviada
pokemonRouter.delete('/deleteDexNum/:dexNum', deletePokemonByDexNum) //borramos de la BD el pokemon con el No. pokedex enviada

module.exports = pokemonRouter