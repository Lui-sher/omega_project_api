const { DataTypes } = require("sequelize")

const Type = (sequelize) => { sequelize.define('type', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
    timestamps: false
})
}

module.exports = Type