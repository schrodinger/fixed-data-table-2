# Contributing to FixedDataTable
We want to make contributing to this project as easy and transparent as possible.

A good place to start is by running the demo server to see examples and documentation:

```shell
npm run site-dev-server [optional-port-number]
```

Open your browser to http://localhost:8080 (or your chosen port number).

## Pull Requests

We actively welcome your pull requests - however, before you begin a pull request, please create an issue so we can determine whether or not the work that you are planning to do is either already being worked on or out of the scope of this project.

1.  Fork the repo and create your branch from `master`.

2. If you've added code that should be tested, add tests.

3. Ensure the test suite passes.

4. Make sure your code lints (coming soon).

## Issues
We use GitHub issues to track public bugs. Please ensure your description is clear and has sufficient instructions to be able to reproduce the issue.

## Coding Style
* Use semicolons;
* Commas last,
* 2 spaces for indentation (no tabs)
* Prefer `'` over `"`
* `"use strict";`
* 80 character line length
* "Attractive"
* Do not use the optional parameters of `setTimeout` and `setInterval`

## Testing

To run tests in the browser, run

```
npm run test:server
```

Open http://localhost:8081/test. Anytime you change test files, the tests will automatically be rerun, no refresh
required! You can even click a specific section to only run those tests.

To run tests in the CLI, run

```
npm run test
```

This will fail on some errors that npm run test:server won't, so it's recommended that you run this command after you've
finished developing on tests with npm run test:server, if you chose that method.

## License
By contributing to FixedDataTable, you agree that your contributions will be licensed under its BSD license.
