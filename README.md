# Integration Testing (example)

## To set up

Copy `.env.example.env` to `.env`, and fill out values. `CONNECTION_STRING` is for the website. `TEST_CONNECTION_STRING` should be a separate database. You don't want to use your dev database for testing, as the testing database is wiped out for each test. You do not have to use both, e.g. if you only wanted to run tests.

**To run website**

* Use one terminal to run the server: `npm run server`
* Use another terminal to run React server: `npm start`

**To run integration tests**

* Run `npm run integration-tests`

---

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
