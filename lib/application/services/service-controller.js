const Boom = require('boom');
const GitHub = require('github-api');
const Logger = require('../../infrastructure/logger');
const HttpClient = require('../../infrastructure/http-client');
const Reference = require('../../domain/reference');
const Service = require('../../domain/service');

function initializeServices(references) {
  return new Promise((resolve) => {
    const services = [];
    references.forEach((reference) => {
      const options = { reference };
      const service = new Service(options);
      services.push(service);
    });
    resolve(services);
  });
}

function fetchNpmData(point, packages) {
  return HttpClient.fetchData(`https://api.npmjs.org/downloads/point/${point}/${packages}`, point);
}

function loadNpmData(services) {
  return new Promise((resolve, reject) => {
    const packages = services.map(service => service.reference.get('npmjs')).join(',');
    const promises = [];
    promises.push(fetchNpmData('last-day', packages));
    promises.push(fetchNpmData('last-week', packages));
    promises.push(fetchNpmData('last-month', packages));
    Promise.all(promises)
      .then((results) => {
        const data = results.reduce((prev, curr) => {
          prev[curr.name] = curr.data;
          return prev;
        }, {});

        services.forEach((service) => {
          const npmPackage = service.reference.get('npmjs');
          service.npmjs.lastDay = data['last-day'][npmPackage];
          service.npmjs.lastWeek = data['last-week'][npmPackage];
          service.npmjs.lastMonth = data['last-month'][npmPackage];
        });
        Logger.info('NPM data loaded');
        resolve(services);
      })
      .catch(err => reject(err));
  });
}

function loadGitHubData(services) {
  return new Promise((resolve, reject) => {
    const gh = new GitHub({ token: 'f27526c811561075b86c63972c2d566f99ab4d6b' });
    const promises = [];

    services.forEach((service) => {
      const github = service.reference.get('github');
      const ids = github.split('/');
      const user = ids[0];
      const repo = ids[1];
      promises.push(gh.getRepo(user, repo).getDetails((err, result) => {
        service.github = result;
      }));
    });

    Promise.all(promises)
      .then(() => {
        Logger.info('GitHub data loaded');
        resolve(services);
      })
      .catch(err => reject(err));
  });
}

function loadStackOverflowData(services) {
  return new Promise((resolve, reject) => {
    const servicesByTag = services.reduce((prev, curr) => {
      prev[curr.reference.get('stackoverflow')] = curr;
      return prev;
    }, {});

    const tags = services.map(service => service.reference.get('stackoverflow')).join(';');
    HttpClient.fetchData(`https://api.stackexchange.com/2.2/tags/${tags}/info?site=stackoverflow`)
      .then((results) => {
        const items = results.items;
        items.forEach((item) => {
          servicesByTag[item.name] = item.count;
        });
        Logger.info('StackOverflow data loaded');
        resolve(services);
      })
      .catch(err => reject(err));
  });
}

module.exports = {
  synchronize(request, reply) {
    reply(Boom.notImplemented('ServiceController#find'));
  },

  find(request, reply) {
    Reference
      .fetchAll()
      .then(initializeServices)
      .then(loadNpmData)
      .then(loadGitHubData)
      .then(loadStackOverflowData)
      .then(services => reply({ services }))
      .catch((err) => {
        Logger.error(err.message);
        reply(Boom.internal(err));
      });
  },

  get(request, reply) {
    reply(Boom.notImplemented('ServiceController#get'));
  },

};

