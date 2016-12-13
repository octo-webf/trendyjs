#!/usr/bin/env bash

echo "DEPENDENCIES:"
echo "- clean        # delete node_modules folder"
echo "- postinstall  # reset DB after dependencies have been fetched",
echo ""

echo "DATABASE:"
echo "- db:migrate   # play DB migration scripts"
echo "- db:seed      # reset DB data"
echo "- db:reset     # reset all DB tables and data"
echo "  "

echo "RUN:"
echo "- start        # start the application"
echo "- start:watch  # start the application in watching mode"
echo "- start:debug  # start the application in debug mode"
echo ""

echo "TESTING:"
echo "- test         # execute the tests"
echo "- test:watch   # execute the tests in watching mode"
echo ""

echo "TOOLS:"
echo "- check        # verify that application is up on localhost"
echo "- coverage     # generate a code coverage report after having executed the tests"
echo "- lint         # check ESLint rules"
echo "- lint:watch   # check ESLint rules in watching mode"
echo ""
