module.exports = {
  getAllMovies(db) {
    return db.query('SELECT * FROM movies');
  },
  create(db, newMovie) {
    return db.query('INSERT INTO movies (name, created_at) VALUES (${name}, ${createdAt}) RETURNING *', {
      name: newMovie.name,
      createdAt: new Date()
    });
  }
};
