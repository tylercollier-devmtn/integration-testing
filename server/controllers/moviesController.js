const movieData = require('../lib/movieData');

module.exports = {
  get(req, res) {
    movieData.getAllMovies(req.app.get('db'))
    .then(movies => {
      res.json(movies);
    })
    .catch(error => {
      console.error('error in dataController.get', error);
      res.status(500).json({ message: 'There was an error on the server' });
    });
  },
  create(req, res) {
    const newMovie = req.body;
    movieData.create(req.app.get('db'), newMovie)
    .then(addedMovies => {
      res.json(addedMovies[0]);
    })
    .catch(error => {
      console.error('error in dataController.create', error);
      res.status(500).json({ message: 'There was an error on the server' });
    });
  }
};
