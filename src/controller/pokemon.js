const root = __dirname.slice(0, -11) + '/public'

const homePageDev = (req, res) => {
    res.sendFile('./homepage.html', {root: root})
}

const aboutPageDev = (req, res) => {
    res.sendFile('./about.html', {root: root})
}

const notFoundPage = (req, res) => {
    res.status(404).sendFile('./404.html', {root: root})
}

module.exports = {
    homePageDev,
    aboutPageDev,
    notFoundPage,
}