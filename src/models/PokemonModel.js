//const  sequelize  = require('../db.js')
const { DataTypes } = require("sequelize")


const Pokemon = (arg) => { arg.define('pokemon', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false
  },
  name: {       //.name  (name name)
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING
  },
  dexNum: {
    type: DataTypes.INTEGER
  },
  hp: {
    type: DataTypes.INTEGER
  },
  attack: {
    type: DataTypes.INTEGER,
  },
  defense: {
    type: DataTypes.INTEGER,
  },
  specialAttack: {
    type: DataTypes.INTEGER,
  },
  specialDefense: {
    type: DataTypes.INTEGER,
  },
  speed: {
    type: DataTypes.INTEGER,
  },
  height: {
    type: DataTypes.INTEGER,
  },
  weight: {
    type: DataTypes.INTEGER,
  },
  }, {
    timestamps: false
  }
)}

module.exports = Pokemon
