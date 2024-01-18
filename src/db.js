const { Sequelize } = require("sequelize")
require('dotenv').config();
const fs = require('fs');
const path = require('path');

const { PGDATABASE_URL } = process.env;

const sequelize = new Sequelize( PGDATABASE_URL, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});

const basename = path.basename(__filename);

const modelDefiners = [];

// filtramos todos los archivos de la carpeta 'models' que cumplan la condicion estructural de los nombres de los modelos,
// y agragarlos a un array, con el fin de hacer el proyecto esccalable. 
// Ej: si mas adelante creamos otro modelo de tabla, este se agregará automaticamente
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { PokemonTable, PokemonTypesTable } = sequelize.models

// Relaciones entre las tablas
PokemonTable.belongsToMany(PokemonTypesTable, {through: "PokemonXTypes"});
PokemonTypesTable.belongsToMany(PokemonTable, {through: "PokemonXTypes"});

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { PokemonTable, PokemonTypesTable } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};