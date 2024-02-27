const { Sequelize } = require("sequelize")
const Type = require("./models/Type.js")
const Pokemon = require("./models/Pokemon.js");
const Pokemon_Type = require("./models/Pokemon_Type.js");
const { DataTypes } = require("sequelize")

require('dotenv').config();

const { PGDATABASE_URL } = process.env;

const sequelize = new Sequelize( PGDATABASE_URL, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});

//Inyectamos la conexion sequelize a cada modelo creado 
Type(sequelize)  //se define la tabla types
Pokemon(sequelize)  //se define la tabla pokemons

/*lo mismo hacemos con la tabla que usaremos como relacion entre los dos modelos previos, 
no es necesario crear este modelo ya que sequelize lo crea automaticamente al hacer la relacion
entre los modelos, pero de esta forma tendremos control soble las columnas y los tipo de datos que
queremos que se creen
*/
Pokemon_Type(sequelize) //se define la tabla "pokemon_type" que será la relacion entre las tablas pokemons y types

// En sequelize.models están todos los modelos (inyectados previamente) como propiedades
// Para relacionarlos hacemos un destructuring
const { type, pokemon } = sequelize.models

// Relaciones entre las tablas
pokemon.belongsToMany(type, {through: "pokemon_type"}); //la tabla "pokemon_type" se crea automaticamente si no la hemos creado anteriormente
type.belongsToMany(pokemon, {through: "pokemon_type"});

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Pokemon, Type } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};