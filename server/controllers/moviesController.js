module.exports = {
  get(req, res) {
    const db = req.app.get('db');
    db.query('select * from movies').then(movies => {
      res.json(movies);
    }).catch(error => {
      console.log('error in dataController.get', error);
      res.status(500).json({ message: 'There was an error on the server' });
    });
  }
};
