
const { PokemonTypesTable } = require('../db');
let gate = true;

const getAllPokemonTypes = async (req, res) => {
    try {
      // res.send('Route Get All Pokemon Types connected')
      if(gate){
        let response = await fetch(`https://pokeapi.co/api/v2/type`)
        let data = await response.json();
        //console.log(data)
        let aux = []
        data.results.map(e => aux.push(e.name))
        console.log(aux)
        aux.forEach( e => PokemonTypesTable.findOrCreate({ where: {name: e}}))
        gate = false;
      }

      const typesAll = await PokemonTypesTable.findAll();
      res.send(typesAll)

    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }

module.exports = {
    getAllPokemonTypes,
}