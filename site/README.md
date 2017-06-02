# Run the server

The first time, get all the dependencies loaded via

```
npm install
```

Then, run the server via

```
npm run site-dev-server
Open http://localhost:8080/
```

Anytime you change the contents, just refresh the page and it's going to be updated.

# Run tests

To run tests in the browser, do

```
npm run test:server
Open http://localhost:8081/test
```

Anytime you change test files, the tests will automatically be rerun, no refresh required! You can even click a specific
section to only run those tests.

To run tests in the CLI, do

```
npm run test
```

This will fail on some errors that npm run test:server won't, so it's recommended that you run this command after you've
finished developing on tests with npm run test:server, if you chose that method.

# Publish the website

Just run the publish script, this will setup your environment if it's not already then it'll automatically build a static version of the site and publish it to gh-pages.

```
npm run site-publish
```
