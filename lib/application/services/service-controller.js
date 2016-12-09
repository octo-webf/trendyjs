const Boom = require('boom');
const Https = require('https');
const GitHub = require('github-api');
const Logger = require('../../infrastructure/logger');
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
  return new Promise((resolve, reject) => {
    Https.get(`https://api.npmjs.org/downloads/point/${point}/${packages}`, (result) => {
      let rawData = '';
      result.on('data', (chunk) => {
        rawData += chunk;
      });
      result.on('end', () => {
        try {
          resolve({ name: point, result: JSON.parse(rawData) });
        } catch (err) {
          Logger.error(err.message);
          reject(err);
        }
      });
    });
  });
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
        const npmData = results.reduce((prev, curr) => {
          prev[curr.name] = curr.result;
          return prev;
        }, {});

        services.forEach((service) => {
          const npmPackage = service.reference.get('npmjs');
          service.npmjs.lastDay = npmData['last-day'][npmPackage];
          service.npmjs.lastWeek = npmData['last-week'][npmPackage];
          service.npmjs.lastMonth = npmData['last-month'][npmPackage];
        });

        resolve(services);
      })
      .catch(err => reject(err));
  });
}

function loadGitHubData(services) {
  return new Promise((resolve, reject) => {
    const gh = new GitHub({ token: 'ecc07be425eefad348651a2de911a7ddb336036d' });
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
      .then(() => resolve(services))
      .catch(err => reject(err));
  });
}

function loadStackOverflowData(services) {
  return new Promise(resolve => resolve(services));
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
      .catch(err => reply(Boom.internal(err)));
  },

  get(request, reply) {
    reply(Boom.notImplemented('ServiceController#get'));
  },

};

