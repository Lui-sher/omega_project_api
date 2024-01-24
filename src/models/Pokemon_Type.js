const { DataTypes, Sequelize } = require("sequelize")

const Pokemon_Type = (arg) => { arg.define('pokemon_type', {
	}, { timestamps: false })
}

module.exports = Pokemon_Type