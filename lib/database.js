const knex = require('knex')(require('./knexfile')[process.env.NODE_ENV || 'development']);
const bookshelf = require('bookshelf')(knex);
bookshelf.plugin('registry');

module.exports = bookshelf;