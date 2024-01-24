const { DataTypes, Sequelize } = require("sequelize")

const Type = (arg) => { arg.define('type', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
    timestamps: false
})
}

module.exports = Type