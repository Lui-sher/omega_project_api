const { Op } = require("sequelize");        //Opciones avanzadas para busquedas sequelize
const { pokemon, type } = require('../db')

const count = { num: 1 }

const getPokemons = async (req, res) => {
	const  cantidad = Number(req.params.cantidad) || 20
  try {
    for (let i = count.num; i < (count.num + cantidad); i++) {
			if (i > 1025) {
				count.num = 1
				break
			}
      const exist = await pokemon.findOne({
        where: {
          dexNum: i
        }
      })

      if(!exist) {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
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
          types: data.types.map(e => e.type.name)
        }

        const { 
          name, image, dexNum, hp, attack, defense, specialAttack, 
          specialDefense, speed, height, weight, types
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
        })

      const thePokemonType = await type.findAll({
        where: {name: types}
      })
      await onePokemon.addTypes(thePokemonType)

      console.log(`PokeDex ID = ${i} ha sido agregado en la Base de datos`)

    } else {
      console.log(`PokeDex ID = ${i} ya existe en la Base de datos`)
    }
		
  }

  const allPokemonDb = await pokemon.findAll({
    where: {
      dexNum: {
        [Op.between]: [count.num, count.num + cantidad - 1]
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
  count.num = count.num + cantidad

  res.send(allPokemonDb)

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

const getAllPokemonDb = async (req, res) => {
  try {
    const allPokemonDb = await pokemon.findAll({
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
    res.send(allPokemonDb)
  } catch (error) {
    res
    .status(500)
    .json({
      message: error.message
    })
  }
  
}

const getOnePokemon = async (req, res) => {
  try {
    const { dexNum } = req.params
    const aPokemon = await pokemon.findOne({
      where: {
        dexNum,
      }
    })
    res.send(aPokemon)
  } catch (error) {
    res
    .status(500)
    .json({
      message: error.message,
    })
  }
}

const deletePokemonById = async (req, res) => {
  try {
    const { id } = req.params
    await pokemon.destroy({
      where: {
        id
      }
    })
    res.send('Data borrada con exito')
  } catch (error) {
    res
    .status(500)
    .json({
      message: error.message,
    })
  }
}

const deletePokemonByDexNum = async (req, res) => {
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
  getPokemons,
  getAllPokemonDb,
  getOnePokemon,
  deletePokemonById,
  deletePokemonByDexNum
}