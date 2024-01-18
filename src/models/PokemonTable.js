const { DataTypes } = require("sequelize")

module.exports = sequelize => {
    // defino el modelo
    sequelize.define('pokemonTable', {
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
      pokedexNumber: {
        type: DataTypes.INTEGER
      },
      hp: {          //.stats[0].base_stat  (vida)
        type: DataTypes.INTEGER
      },
      attack: {    //.stats[1].base_stat  (fuerza)
        type: DataTypes.INTEGER,
      },
      defense: {  //.stats[2].base_stat  (defenza)
        type: DataTypes.INTEGER,
      },
      speed: {  //.stats[5].base_stat  (velocidad)
        type: DataTypes.INTEGER,
      },
      height: {               //.height  (altura)
        type: DataTypes.INTEGER,
      },
      weight: {                 //.weight  (peso)
        type: DataTypes.INTEGER,
      },
    }, {
        timestamps: false
    });
  };