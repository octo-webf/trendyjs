const path = require('path');

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: path.join(__dirname, 'db/data/dev.sqlite3'),
    },
    migrations: {
      directory: 'db/migrations',
    },
    seeds: {
      directory: 'db/seeds',
    },
    useNullAsDefault: true,
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: 'db/migrations',
      tableName: 'knex_migrations',
    },
    seeds: {
      directory: 'db/seeds',
    },
  },

  production: {
    client: 'sqlite3',
    connection: {
      filename: path.join(__dirname, 'db/data/prod.sqlite3'),
    },
    migrations: {
      directory: 'db/migrations',
    },
    seeds: {
      directory: 'db/seeds',
    },
    useNullAsDefault: true,
/*
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: 'db/migrations',
      tableName: 'knex_migrations',
    },
    seeds: {
      directory: 'db/seeds',
    },
*/
  },

  test: {
    client: 'sqlite3',
    connection: {
      filename: path.join(__dirname, 'db/data/test.sqlite3'),
    },
    migrations: {
      directory: 'db/migrations',
    },
    seeds: {
      directory: 'db/seeds',
    },
    useNullAsDefault: true,
  },

};
