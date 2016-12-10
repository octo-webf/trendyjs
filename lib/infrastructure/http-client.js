const Https = require('https');
const Logger = require('./logger');

module.exports.fetchData = (url, name) =>
  new Promise((resolve, reject) => {
    Https.get(url, (response) => {
      const statusCode = response.statusCode;
      const contentType = response.headers['content-type'];

      let error;
      if (statusCode !== 200) {
        error = new Error(`Request Failed.\nStatus Code: ${statusCode}`);
      } else if (!/^application\/json/.test(contentType)) {
        error = new Error(`Invalid content-type.\nExpected application/json but received ${contentType}`);
      }
      if (error) {
        Logger.error(error.message);
        response.resume();
        return;
      }

      Logger.info(`Data fetched from ${url}.`);

      response.setEncoding('utf8');
      let rawData = '';
      response.on('data', (chunk) => {
        rawData += chunk;
      });
      response.on('end', () => {
        try {
          const data = JSON.parse(rawData);
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
