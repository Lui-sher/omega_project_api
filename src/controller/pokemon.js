const getAllPokemon = async (req, res) => {
    try {
      res.send('all pokemon connected')
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }

module.exports = {
    getAllPokemon,
}