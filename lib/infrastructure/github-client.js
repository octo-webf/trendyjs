const GitHub = require('github-api');
const config = require('../settings');

module.exports = new GitHub({ token: config.github.token });
