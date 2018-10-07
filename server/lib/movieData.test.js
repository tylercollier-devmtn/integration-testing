const movieData = require('./movieData');
const sinon = require('sinon');

describe('unit tests', () => {
  describe('create', () => {
    it('automatically passes in the current createdAt timestamp', () => {
      const movieName = 'Some New Movie';
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
