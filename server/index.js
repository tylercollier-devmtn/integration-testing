const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
require('dotenv').config();
const moviesController = require('./controllers/moviesController');

const app = express();
app.use(bodyParser.json());

massive(process.env.CONNECTION_STRING)
  .then(db => {
    app.set('db', db);
  })
  .catch(error => console.log('error', error));

app.get('/api/movies', moviesController.get);

const SERVER_PORT = process.env.SERVER_PORT || 4050;
app.listen(SERVER_PORT, () => console.log(`Server listening on ${SERVER_PORT}`));
