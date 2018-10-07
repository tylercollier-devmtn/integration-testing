const movieData = require('../lib/movieData');

module.exports = {
  get(req, res) {
    movieData.getAllMovies(req.app.get('db'))
    .then(movies => {
      res.json(movies);
    })
    .catch(error => {
      console.log('error in dataController.get', error);
      res.status(500).json({ message: 'There was an error on the server' });
    });
  }
};
