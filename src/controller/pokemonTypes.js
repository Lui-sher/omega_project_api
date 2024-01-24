const { type } = require('../db');
const gate = { open: true }

const getAllPokemonTypes = async (req, res) => {
  try {
    if(gate.open){
      const response = await fetch(`https://pokeapi.co/api/v2/type`)
      const data = await response.json();
      const aux = []
      data.results.map(e => aux.push(e.name))
      aux.forEach( e => type.findOrCreate({ where: {name: e}}))
      gate.open = false;
      console.log('Pokemon Types cargados a la base de datos desde https://pokeapi.co/api/v2/type')
    }
    const typesAll = await type.findAll();
    console.log('Pokemon Types extraidos de la base de datos')
    res.send(typesAll)
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

module.exports = {
    getAllPokemonTypes,
    gate
}