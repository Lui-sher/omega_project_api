const express = require('express')
const pokemonRouter = express.Router()
const {
	getOnePokemonApi,
	getSeveralPokemon,
	getAllCustomPokemon,
	addPokemonToDb,
	postCustomPokemon,
  deletePokemonByIdDb,
  deletePokemonByDexNumDb,
} = require('../controller/pokemon.js')

pokemonRouter.get('/get_one_pokemon/:dexOrName', getOnePokemonApi) //busca por nombre o numero pokedex en la BD en su defecto en la PokeApi
pokemonRouter.get('/get_several_pokemon', getSeveralPokemon) //se obtienen por defecto los 20 primeros pokemon; si le agregamos Ej: amount=5&start=20 definimos la cantidad y el inicio
pokemonRouter.get('/get_all_custom_pokemon', getAllCustomPokemon) //se obtienen todos los pokemon creados por los usuarios
pokemonRouter.post('/post_custom_pokemon', postCustomPokemon) //Se agrega un nuevo pokemon tomando los datos enviados por Body
//------------------------- Dev Mode -----------------------------------------
pokemonRouter.get('/add_one_pokemon_to_db/:dex', addPokemonToDb) //agrega un pokemon aunque ya esté en la base de datos, duplicando la info
pokemonRouter.delete('/delete_id_db/:id', deletePokemonByIdDb) //borra de la base de datos el pokemon con la id enviada
pokemonRouter.delete('/delete_dexnum_db/:dexNum', deletePokemonByDexNumDb) //borra de la BD todos los datos referente al numero de pokedex

module.exports = pokemonRouter