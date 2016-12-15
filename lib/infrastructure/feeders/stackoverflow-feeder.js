const Request = require('request');
const DataFeeder = require('./data-feeder');
const Logger = require('../logger');

class StackoverflowFeeder extends DataFeeder {
  feedData(services) {
    return new Promise((resolve, reject) => {

      const tags = services.map(service => service.reference.get('stackoverflow')).join(';');
      const url = `https://api.stackexchange.com/2.2/tags/${tags}/info?site=stackoverflow`;
      const options = { method: 'GET', uri: url, gzip: true };

      Request(options, (error, response, body) => {
        if (error) reject(error);

        const data = JSON.parse(body);
        const items = data.items;

        const tags = items.reduce((prev, curr) => {
          prev[curr.name] = curr;
          return prev;
        }, {});

        services.forEach(service => {
          service.stackoverflow = tags[service.reference.get('stackoverflow')];
        });

        Logger.info('StackOverflow data loaded');
        resolve(services);
      });
    });
  };
}

module.exports = new StackoverflowFeeder();
