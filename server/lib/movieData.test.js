const movieData = require('./movieData');
const sinon = require('sinon');
const testInit = require('../../test/init');

describe('unit tests', () => {
  describe('create', () => {
    it('automatically passes in the current createdAt timestamp', () => {
      const movieName = 'Test Movie Name';
      const fakeDb = {
        query: sinon.mock()
          .withArgs(
            sinon.match.string,
            sinon.match({
              name: movieName,
              createdAt: sinon.match.date
            })
          )
      };
      return movieData.create(fakeDb, { name: movieName })
    });
  });
});

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
    it('inserts a record into the database with a created_at date', () => {
      const movieName = 'Test Movie Name';
      return movieData.create(db, { name: movieName })
      .then(() => {
        return db.query('SELECT * FROM movies').then(movies => {
          expect(movies.length).toEqual(1);
          expect(movies[0]).toMatchObject({
            name: movieName,
            created_at: expect.any(Date)
          });
        });
      });
    });
  });
});
