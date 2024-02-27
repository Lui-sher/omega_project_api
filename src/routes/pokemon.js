const express = require('express')
const pokemonRouter = express.Router()
const {
	getOnePokemonApi,
	getSeveralPokemon,
	addPokemonToDb,
  deletePokemonByIdDb,
  deletePokemonByDexNumDb,
} = require('../controller/pokemon.js')

pokemonRouter.get('/get_one_pokemon/:dexOrName', getOnePokemonApi) //busca por nombre o numero pokedex en la BD en su defecto en la PokeApi
pokemonRouter.get('/get_several_pokemon', getSeveralPokemon) //se obtienen por defecto 20 pokemon
pokemonRouter.get('/get_several_pokemon/:amount', getSeveralPokemon)// se obtiene la cantidad de pokemon solicitado
//------------------------- Dev Mode -----------------------------------------
pokemonRouter.get('/add_one_pokemon_to_db/:dex', addPokemonToDb) //agrega un pokemon aunque ya esté en la base de datos, duplicando la info
pokemonRouter.delete('/delete_id_db/:id', deletePokemonByIdDb) //borra de la base de datos el pokemon con la id enviada
pokemonRouter.delete('/delete_dexnum_db/:dexNum', deletePokemonByDexNumDb) //borra de la BD todos los datos referente al numero de pokedex

module.exports = pokemonRouter