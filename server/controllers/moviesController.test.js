const moviesController = require('./moviesController');
const testInit = require('../../test/init');

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
  });
});
