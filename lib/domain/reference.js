const bookshelf = require('bookshelf');

module.exports = bookshelf.Model.extend({
  tableName: 'references',
  key: '',
  name: '',
  description: '',
  tags: ['', ''],
  npmPackage: '',
  githubRepository: '',
  stackoverflowTags: '',
});