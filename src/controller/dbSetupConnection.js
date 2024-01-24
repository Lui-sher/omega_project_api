const { conn } = require('../db')
const { gate } = require("./pokemonTypes")

const dbSetupConnection = async (req, res) => {
	try {
		const code = req.params.code
		if(code === 'sync') {
			//comando para sincronizar todos los modelos de tablas en la Base de Datos forzando el borrado del contenido de las tablas previamente
			await conn.sync(
				{ force: true }, console.log('Database connection has been rebooted successfully.')
			)
			gate.open = true
			res.send('Database connection has been rebooted successfully.')
		}

		if(code === 'drop') {
			//comando para borrar todas las tablas de la BD respecto a los modelos creados aca
			await conn.drop(
				console.log('All tables in database has been deleted.')
			)
			res.send('All tables in database has been deleted.')
		}

	} catch (error) {
		console.error('Unable to connect to the database:', error);
		res.send(error)
	}
}


module.exports = { 
	dbSetupConnection
}