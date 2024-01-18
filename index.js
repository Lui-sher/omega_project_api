const app  = require('./src/app.js')
const { conn } = require('./src/db.js')
/*** Estas dos lineas las requerimos solo una vez para crear las tablas en la base de datos***/
const pokemonTable = require('./src/models/PokemonTable.js')  
const PokemonTypesTable = require('./src/models/PokemonTypesTable.js')   
/*********************************************************************************************/
const PORT = process.env.PORT || 3000

async function main () {
	
	try {
		await conn
		.sync(
			{ force: true }, //'force: true' para que las tablas se borren y se creen cada vez que abrimos el servidor, por ende se borran todos los datos creados anteriormente
			console.log('Database connection has been established successfully.')
		)
		.then(() => {
			app.listen(PORT, () => {
				console.log("Server running on", PORT === 3000 ? "http://localhost:3000" : PORT)
			})
		})
	} catch (error) {
		console.error('Unable to connect to the database:', error);
	}
}

//sequelize.close() comando para cerrar la conexion
main();