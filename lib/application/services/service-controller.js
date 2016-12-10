const Boom = require('boom');
const Logger = require('../../infrastructure/logger');
const Reference = require('../../domain/reference');
const Service = require('../../domain/service');
const NpmjsFeeder = require('../../infrastructure/feeders/npmjs-feeder');
const GithubFeeder = require('../../infrastructure/feeders/github-feeder');
const StackoverflowFeeder = require('../../infrastructure/feeders/stackoverflow-feeder');

function convertReferencesIntoServices(references) {
  return new Promise((resolve) => {
    const services = references.map((reference) => {
      const options = { reference };
      return new Service(options);
    });
    resolve(services);
  });
}

module.exports = {
  synchronize(request, reply) {
    reply(Boom.notImplemented('ServiceController#find'));
  },

  find(request, reply) {
    Reference
      .fetchAll()
      .then(convertReferencesIntoServices)
      .then(NpmjsFeeder.feedData)
      .then(GithubFeeder.feedData)
      .then(StackoverflowFeeder.feedData)
      .then(services => reply({ services }))
      .catch((err) => {
        Logger.error(err);
        reply(Boom.internal(err));
      });
  },

  get(request, reply) {
    reply(Boom.notImplemented('ServiceController#get'));
  },
};
