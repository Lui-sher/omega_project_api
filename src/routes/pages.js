const express = require('express');
const { showHomePage, showAboutPage } = require("../controller/pages")
const pagesRouter = express.Router()

pagesRouter.get('/', showHomePage);       //obtenemos una pagina html dando la bienvenida
pagesRouter.get('/about', showAboutPage)  //obtenemos una pagina html sobre el proyecto back-end

module.exports = pagesRouter