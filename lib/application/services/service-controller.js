const Boom = require('boom');

module.exports = {
  synchronize(request, reply) {
    reply(Boom.notImplemented('ServiceController#find'));
  },

  find(request, reply) {
    reply(Boom.notImplemented('ServiceController#find'));
  },

  get(request, reply) {
    reply(Boom.notImplemented('ServiceController#get'));
  },

  save(request, reply) {
    reply(Boom.notImplemented('ServiceController#save'));
  },

};

