const Boom = require('boom');
const Logger = require('../../infrastructure/logger');
const Reference = require('../../domain/reference');

module.exports = {
  synchronize(request, reply) {
    reply(Boom.notImplemented('ServiceController#find'));
  },

  find(request, reply) {
    Reference
      .fetchAll()
      .then(references => {
        reply({ 'references': references.toArray() })
      })
      .catch(err => {
        Logger.error(err);
        reply(Boom.internal(err))
      });
  },

  get(request, reply) {
    reply(Boom.notImplemented('ServiceController#get'));
  },

};

