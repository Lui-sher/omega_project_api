const root = __dirname.slice(0, -11) + '/public'

const showHomePage = async (req, res) => {
    try {
      res.sendFile('./homepage.html', {root: root})
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }

const showAboutPage = async (req, res) => {
    try {
        res.sendFile('./about.html', {root: root})
      } catch (error) {
        res.status(500).json({
          message: error.message,
        });
      }
    }

module.exports = {
    showHomePage,
    showAboutPage,
}