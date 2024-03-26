const app  = require('./src/app.js')
const { conn } = require("./src/db.js")
const  PORT = process.env.PORT || 3000

async function DbAndPort_Connect () {
	try {
		await conn
		.sync( console.log('Database connection has been established successfully.') )
		.then(() => {
			app
			.listen(PORT, () => {
				console.log("Server running on", PORT === 3000 ? "http://localhost:3000" : PORT)
			})
		})
	} catch (error) {
		console.error('Unable to connect to the database:', error);
	}
}

DbAndPort_Connect();