const request = require('request');
const DataFeeder = require('./data-feeder');
const Logger = require('../logger');

request.debug = true;

function fetchNpmData(name, packages) {
  return new Promise((resolve, reject) => {
    request.get(`https://api.npmjs.org/downloads/point/${name}/${packages}`, (error, response, body) => {
      if (error) reject(error);
      resolve({ name, data: JSON.parse(body) });
    });
  });
}

class NpmjsFeeder extends DataFeeder {
  feedData(services) {
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
          Logger.debug('NPM data loaded');
          resolve(services);
        })
        .catch(err => reject(err));
    });
  }
}

module.exports = new NpmjsFeeder();
