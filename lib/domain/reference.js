const Bookshelf = require('../database');

const Reference = Bookshelf.Model.extend({
  tableName: 'references',
});

module.exports = Bookshelf.model('Reference', Reference);
