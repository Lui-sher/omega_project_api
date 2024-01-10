const fs = require("fs");
const path = require("path")
const express = require("express")
const app = express()

app.use((req, res, next) => {
    console.log('method: ',req.method)
    console.log('ruta: ', req.path)
	console.log(__dirname)
    next()
})

app.get('/', (req, res)=>{
	res.sendFile('./public/homepage.html', {root: __dirname})
})

app.get('/about', (req, res)=>{
	res.sendFile('./public/about.html', {root: __dirname})
})

app.use((req, res) => {  //esta es la construccion de una ruta por defecto en caso de hacer match con ninguna ruta definida y se debe crear al final de las otras rutas
    res.status(404).sendFile('./public/404.html', {root: __dirname})
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log("Server running on", PORT === 3000 ? "http://localhost:3000" : PORT)
})