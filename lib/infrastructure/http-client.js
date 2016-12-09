const Https = require('https');
const Logger = require('./logger');

module.exports.fetchData = (url, name) =>
  new Promise((resolve, reject) => {
    Https.get(url, (result) => {
      Logger.debug(`Data fetched from ${url}.`);
      let data = '';
      result.on('data', (chunk) => {
        data += chunk;
      });
      result.on('end', () => {
        try {
          data = JSON.parse(data);
          if (name) {
            resolve({ name, data });
          } else {
            resolve(data);
          }
        } catch (err) {
          reject(err);
        }
      });
    }).on('error', err => reject(err));
  });
