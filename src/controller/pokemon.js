const { Op } = require("sequelize");        //Opciones avanzadas para busquedas sequelize
const { pokemon, type } = require('../db')

/************************************Funciones internas************************************************/

// function para buscar el primer registro relacionado a un nombre o pokedex en la base de datos
const findOnePokemonInDb = async ( dexOrName ) => {
	try {
		console.log(` -> Buscando el pokemon ('${dexOrName}') en la base de datos... `)
		const dexNum = Number( dexOrName )
		if( dexNum ) {
			const result = await pokemon.findOne({
				where: {
					dexNum
				},
				include: [
					{
						model: type,
						attributes: ['name'],
						through: {
							attributes: [],
						}
					}
				]
			})
			if (result) {
				console.log(` -> El pokemon con numero de pokedex: ${dexNum} ha sido encontrado en la Base de datos!`)
				return result
			} 
			console.log(` -> El pokemon con numero de pokedex: ${dexNum} no ha sido hallado en la base de datos!`)
			return result

		} else {
			const name = dexOrName
			const result = await pokemon.findOne({
				where: {
					name
				},
				include: [
					{
						model: type,
						attributes: ['name'],
						through: {
							attributes: [],
						}
					}
				]
			})
			if ( result ) {
				console.log(` -> El pokemon de nombre: '${name}' ha sido encontrado en la Base de datos`)
				return result
			}
			console.log(` -> El pokemon de nombre: ${name} no ha sido hallado en la base de datos!`)
			return result
		}
	} catch (error) {
		console.log( error.message )
	}

}

// function para buscar un pokemon en la PokeApi por numero o nombre
const findOnePokemonInPokeApi = async ( dexOrName )=> {
	console.log(" -> Buscando en la PokeApi...")
	try {
		const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${dexOrName}`)
		const data = await response.json();
		const info = {
			name: data.name,
			image: data.sprites.other.home.front_default,
			dexNum: data.id,
			hp: data.stats[0].base_stat,
			attack: data.stats[1].base_stat,
			defense: data.stats[2].base_stat,
			specialAttack: data.stats[3].base_stat,
			specialDefense: data.stats[4].base_stat,
			speed: data.stats[5].base_stat,
			height: data.height,
			weight: data.weight,
			types: data.types.map(e => e.type.name),
		}

		const { 
			name, image, dexNum, hp, attack, defense, specialAttack, 
			specialDefense, speed, height, weight, types,
		} = info

		const onePokemon = await pokemon.create({
				name, 
				image, 
				dexNum, 
				hp, 
				attack, 
				defense, 
				specialAttack, 
				specialDefense, 
				speed, 
				height, 
				weight,
				custom: false,
		})

		const thePokemonType = await type.findAll({
			where: {name: types}
		})
		await onePokemon.addTypes(thePokemonType)

		console.log(` -> ${name} con No. de Pokedex: ${dexNum} ha sido agregado en la Base de datos`)

		const aux = await findOnePokemonInDb(dexNum)
		return aux

	} catch (error) {
		console.log(` -> El nombre '${dexOrName}' no ha sido encontrado en la PokeApi, ¡¡Verificar nombre o numero de pokedex!!`)
	}
}

//function que busca todos los registros relacionados a uno o varios pokemon dentro de un rango de la pokedex existente en la base de datos
const findSeveralPokemonDexNumDb = async (min, max) => {
	try {
		const result = await pokemon.findAll({
			where: {
				dexNum: {
					[Op.between]: [min, max]
				}
			},
			include: [
				{
					model: type,
					attributes: ['name'],
					through: {
						attributes: [],
					}
				}
			],
			order: [
				['dexNum', 'ASC']
			]
		})
		if(!result[0]) return null
		
		return result

	} catch (error) {
		console.log(error.message)
	}
}


//Function para buscar un registro mediante el ID
const findPokemonById = async ( id ) => {
	try {
		const result = await pokemon.findOne({
			where: {
				id
			},
			include: [
				{
					model: type,
					attributes: ['name'],
					through: {
						attributes: [],
					}
				}
			]
		})
		return result

	} catch (error) {
		console.log(error.message)
	}
}
//

/******************************************************************************************************/

//------------------------------------SOLICITUDES GET----------------------------------------------------

//Solicitud para OBTENER(GET) un pokemon buscando primero en la base de datos luego en la PokeApi con el nombre o Pokedex
const getOnePokemonApi = async (req, res) => {
	try {
		const { dexOrName } = req.params
		console.log(`\n`)
		const result = await findOnePokemonInDb( dexOrName )
		if( result ) {
			console.log(`\n`)
			res.send( result )
		} else {
			const result = await findOnePokemonInPokeApi( dexOrName )
			console.log(`\n`)
			if(result) res.send( result )
			else {
				console.log(` -> El pokemon ${dexOrName} no existe`)
				res.send(` -> El nombre '${dexOrName}' no ha sido encontrado en la PokeApi, ¡¡Verificar nombre o numero de pokedex!!`)
			}
		}		
	} catch (error) {
		res
    .status(500)
    .json({message: error.message})
	}

}

//Solicitud para OBTENER(GET) la cantidad solicitada por query o 20 pokemon por defecto buscando en la base de datos luego en la PokeApi
const getSeveralPokemon = async (req, res) => {
	try {
		const amount = Number(req.query.amount) || 20
		const start = Number(req.query.start) || 1

		const min = start
		const max = start + amount - 1
		for ( let i = min; i <= max; i++ ) {
			console.log(`\n`)
			const result = await findOnePokemonInDb(i)
			if ( !result ) {
				await findOnePokemonInPokeApi(i)
			}
		}
		const result = await findSeveralPokemonDexNumDb (min, max)
		console.log(`\n`)
		res.send(result)

	} catch (error) {
		res
    .status(500)
    .json({message: error.message})
	}

}


//Solicitud (GET) trae todos los custom Pokemon
const getAllCustomPokemon = async( req, res ) => {
	try {
		const result = await pokemon.findAll({
			where: {
				custom: true
			},
			include: [
				{
					model: type,
					attributes: ['name'],
					through: {
						attributes: [],
					}
				}
			]
		})

		res.send(result)

	} catch (error) {
		res
    .status(500)
    .json({message: error.message})
	}

}

//------------------------------------------------------------------------------------------------------

///////////////////////////////////////  SOLICITUDES POST  //////////////////////////////////////////////

// Solicitud para AGREGAR(POST) un nuevo dato para un pokemon creado manualmente (creado por el usuario) y agregarlo a la base de datos
const postCustomPokemon = async (req, res) => {
	try {
		const customPokemon = req.body;
		const { 
			name, image, hp, attack, defense, specialAttack, 
			specialDefense, speed, height, weight, types,
		} = customPokemon

		const onePokemon = await pokemon.create({
				name, 
				image, 
				dexNum: null, 
				hp, 
				attack, 
				defense, 
				specialAttack, 
				specialDefense, 
				speed, 
				height, 
				weight,
				custom: true
		})

		const thePokemonType = await type.findAll({
			where: {name: types}
		})

		await onePokemon.addTypes(thePokemonType)
		const result = await findPokemonById( onePokemon.dataValues.id )
		res.send(result)

	} catch (error) {
		res
    .status(500)
    .json({message: error.message})
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////

//**************************************** Dev Mode ****************************************************

//Function para OBTENER(GET) los datos de un pokemon y agregarlo a la base de datos duplicando la informacion si ya existia en al base de datos pero con un ID distinto 
const addPokemonToDb = async ( req, res ) => {
	try {
		const { dex } = req.params
		const result = await findOnePokemonInPokeApi( dex )
		if(result){
			res.send(` -> The pokemon '${result.name}' has been added successfully!`)
		}

	} catch (error) {
    res
    .status(500)
    .json({message: error.message})
  }
}

//Function para ELIMINAR(DELETE) los datos de un pokemon en la base de datos usando como base la ID del pokemon
const deletePokemonByIdDb = async (req, res) => {
  try {
    const { id } = req.params
    await pokemon.destroy({
      where: {
        id
      }
    })
    res.send(`La informacion del Pokémon con la ID:${id} ha sido eliminada de la base de datos`)
  } catch (error) {
    res
    .status(500)
    .json({
      message: error.message,
    })
  }
}

//Function para ELIMINAR(DELETE) los datos de un pokemon en la base de datos usando como base la POKEDEX del pokemon
const deletePokemonByDexNumDb = async (req, res) => {
  try {
    const { dexNum } = req.params
    await pokemon.destroy({
      where: {
        dexNum
      }
    })
    res.send(`Pokemon con Numero de pokedex: ${dexNum} ha sido borrado con exito`)
  } catch (error) {
    res
    .status(500)
    .json({message: error.message})
  }
}

module.exports = {
	getOnePokemonApi,
	getSeveralPokemon,
  getAllCustomPokemon,
	addPokemonToDb,
	postCustomPokemon,
  deletePokemonByIdDb,
  deletePokemonByDexNumDb,
}