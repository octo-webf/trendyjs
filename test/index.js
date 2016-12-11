const logger = require('../lib/infrastructure/logger');
const knex = require('knex')(require('../lib/knexfile')['test']);

knex.migrate.latest()
  .then(() => knex.seed.run())
  .then(() => logger.warn('migrations are finished'));