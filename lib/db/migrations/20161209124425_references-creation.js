const Logger = require('../../infrastructure/logger');

exports.up = knex => knex.schema.createTable('references', (table) => {
  table.increments('id').primary();
  table.string('key');
  table.string('name');
  table.string('description');
  table.string('website');
  table.string('tags');
  table.string('npmjs');
  table.string('github');
  table.string('stackoverflow');

  Logger.info('Table "references" created.');
});

exports.down = knex => knex.schema.dropTable('references', () => {
  Logger.info('Table "references" deleted.');
});
