const app  = require('./src/app.js')
const { conn } = require('./src/db.js')

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

//await conn.sync()  //comando para sincronizar todos los modelos de tablas en la Base de Datos
//await conn.close() //comando para cerrar la conexion
//await conn.drop()  //comando para borrar todas las tablas de los modelos creados aca en la Base de Datos
main();