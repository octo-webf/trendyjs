const Hapi = require('hapi');
const HapiSwagger = require('hapi-swagger');
const Pack = require('./package');

const config = require('./lib/settings');
const logger = require('./lib/infrastructure/logger');

const server = new Hapi.Server({
  'connections': {
    'routes': {
      'cors': true
    }
  }
});

server.connection({ port: config.port });

server.register([

  /* API */
  require('./lib/application/services'),

  /* Hapi plugins */
  require('inert'),
  require('vision'),
  require('blipp'),
  {
    register: HapiSwagger,
    options: {
      info: {
        'title': 'TrendyJS API documentation',
        'version': Pack.version
      },
      documentationPath: '/api/documentation'
    }
  },
  {
    register: require('good'),
    options: {
      reporters: {
        console: [{
          module: 'good-squeeze',
          name: 'Squeeze',
          args: [{
            response: '*',
            log: '*'
          }]
        }, {
          module: 'good-console'
        }, 'stdout']
      }
    }
  }
], (err) => {
  if (err) logger.error(err)
});

module.exports = server;

