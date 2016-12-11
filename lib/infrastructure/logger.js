const bunyan = require('bunyan');
const config = require('../settings');

module.exports = bunyan.createLogger({
  name: 'trendyjs-api',
  level: config.logger.level,
});
