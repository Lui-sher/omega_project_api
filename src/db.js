const { Sequelize } = require("sequelize")
const Type = require("./models/TypeModel.js")
const Pokemon = require("./models/PokemonModel.js");
const Pokemon_Type = require("./models/PokemonModel.js");

require('dotenv').config();

const { PGDATABASE_URL } = process.env;

const sequelize = new Sequelize( PGDATABASE_URL, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});

//Inyectamos la conexion sequelize en los modelos 
Type(sequelize)  //se define la tabla types
Pokemon(sequelize)  //se define la tabla pokemons
Pokemon_Type(sequelize) //se define la tabla pokemon_type que será la relacion entre las tablas pokemons y types

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { type, pokemon } = sequelize.models

// Relaciones entre las tablas
pokemon.belongsToMany(type, {through: "pokemon_type"}); 
type.belongsToMany(pokemon, {through: "pokemon_type"});

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Pokemon, Type } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};