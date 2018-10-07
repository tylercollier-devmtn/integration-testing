module.exports = {
  getAllMovies(db) {
    return db.query('SELECT * FROM movies');
  }
};
