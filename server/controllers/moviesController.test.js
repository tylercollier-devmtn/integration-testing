const moviesController = require('./moviesController');
const testInit = require('../../test/init');
const movieData = require('../lib/movieData');

describe('integration tests', () => {
  let db;
  function clearDatabase() {
    return db.query('DELETE FROM movies');
  }

  beforeAll(() => {
    return testInit.initDb().then(database => {
      db = database;
    });
  });

  beforeEach(() => {
    return clearDatabase();
  });

  describe('create', () => {
    it('responds with success', done => {
      const movieName = 'Test Movie Name';
      const req = {
        app: {
          get: () => db
        },
        body: { name: movieName }
      };
      const res = {
        json: function(data) {
          expect(data).toMatchObject({
            name: movieName,
            created_at: expect.any(Date)
          });
          done();
        }
      };
      moviesController.create(req, res);
    });
    
    it.only('responds with an error on a duplicate movie name', done => {
      const movieName = 'Test Movie Name';
      // First, force a single movie in the database.
      movieData.create(db, { name: movieName }).then(() => {
        // Now use the controller to create it again.
        const req = {
          app: {
            get: () => db
          },
          body: { name: movieName }
        };
        const res = {
          status(num) {
            expect(num).toBe(500);
            return {
              json(data) {
                expect(data).toEqual({ message: 'There was an error on the server' });
                done();
              }
            };
          }
        };
        moviesController.create(req, res);
      });
    });
  });
});
