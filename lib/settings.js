const path = require('path');

module.exports = (() => {
  const config = {

    rootPath: path.normalize(path.join(__dirname, '/..')),
    port: parseInt(process.env.PORT, 10) || 3000,
    environment: process.env.NODE_ENV || 'development',
    logger: {
      level: 30,
    },
  };

  if (process.env.NODE_ENV === 'production') {
    config.logger.level = 40;
  }

  if (process.env.NODE_ENV === 'test') {
    config.port = null;
    config.logger.level = 40;
  }

  return config;
})();
