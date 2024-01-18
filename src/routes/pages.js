const express = require('express');
const { showHomePage, showAboutPage } = require("../controller/pages")
const pagesRouter = express.Router()

pagesRouter.get('', showHomePage);
pagesRouter.get('/about', showAboutPage)

module.exports = pagesRouter