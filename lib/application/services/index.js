const ServiceController = require('./service-controller');

exports.register = (server, options, next) => {
  server.route([
    {
      method: 'GET',
      path: '/api/services',
      config: { handler: ServiceController.find, tags: ['api'] },
    },
    {
      method: 'GET',
      path: '/api/services/{id}',
      config: { handler: ServiceController.get, tags: ['api'] },
    },
    {
      method: 'POST',
      path: '/api/services',
      config: { handler: ServiceController.save, tags: ['api'] },
    },
  ]);

  return next();
};

exports.register.attributes = {
  name: 'services-api',
  version: '1.0.0',
};
