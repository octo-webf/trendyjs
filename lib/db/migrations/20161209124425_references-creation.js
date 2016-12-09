const logger = require('../../infrastructure/logger');

exports.up = (knex, Promise) => {
  return knex.schema.createTable('references', (table) => {
    table.increments('id').primary();
    table.string('key');
    table.string('name');
    table.string('description');
    table.string('website');
    table.string('tags');
    table.string('npmPackage');
    table.string('githubRepository');
    table.string('stackoverflowTags');

    logger.info('Table \"references\" created.');
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('references', (table) => {
    logger.info('Table \"references\" deleted.');
  });
};
