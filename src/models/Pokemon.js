const { DataTypes, Sequelize } = require("sequelize")


const Pokemon = (sequelize) => { sequelize.define('pokemon', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false
  },
  name: {
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
	custom: {
		type: DataTypes.BOOLEAN,
	}
  }, {
    timestamps: false
  }
)}

module.exports = Pokemon
