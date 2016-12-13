## Installation

> This project is developed with Node.js 6.9.1 and Yarn 0.17.9.

```bash
$ git clone git@github.com:octo-web-front-end-tribe/trendyjs.git
$ npm install
$ npm test
$ npm start
$ npm check
```

## Development

Run NPM task `help` to see the usage and available tasks:

```bash
$ npm run help
 
DEPENDENCIES:
- clean        # delete node_modules folder
- postinstall  # reset DB after dependencies have been fetched
  
DATABASE:
- db:migrate   # play DB migration scripts
- db:seed      # reset DB data
- db:reset     # reset all DB tables and data
 
RUN:
- start        # start the application
- start:watch  # start the application in watching mode
- start:debug  # start the application in debug mode
 
TESTING:
- test         # execute the tests
- test:watch   # execute the tests in watching mode
 
TOOLS:
- check        # verify that application is up on localhost
- coverage     # generate a code coverage report after having executed the tests
- lint         # check ESLint rules
- lint:watch   # check ESLint rules in watching mode
```
