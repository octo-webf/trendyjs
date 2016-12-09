exports.seed = (knex, Promise) => {
  return knex('references').del().then(() => {
    return Promise.all([
      knex('references').insert({
        id: 1,
        key: 'angularjs',
        name: 'AngularJS',
        website: 'http://angularjs.org',
        npmPackage: 'angular',
        githubRepository: 'angular/angular.js',
        stackoverflowTags: 'angularjs'
      }),
      knex('references').insert({
        id: 2,
        key: 'angular2',
        name: 'Angular 2',
        website: 'https://angular.io',
        npmPackage: 'angular2',
        githubRepository: 'angular/angular',
        stackoverflowTags: 'angular2'
      }),
      knex('references').insert({
        id: 3,
        key: 'aurelia',
        name: 'Aurelia',
        website: '',
        npmPackage: 'aurelia-cli',
        githubRepository: 'aurelia/framework',
        stackoverflowTags: 'aurelia'
      }),
      knex('references').insert({
        id: 4,
        key: 'backbone',
        name: 'Backbone',
        website: 'http://backbonejs.org',
        npmPackage: 'backbone',
        githubRepository: 'jashkenas/backbone',
        stackoverflowTags: 'backbone.js'
      }),
      knex('references').insert({
        id: 5,
        key: 'ember',
        name: 'Ember',
        website: 'http://www.emberjs.com',
        npmPackage: 'ember',
        githubRepository: 'emberjs/ember.js',
        stackoverflowTags: 'ember.js'
      }),
      knex('references').insert({
        id: 6,
        key: 'react',
        name: 'React',
        website: 'https://facebook.github.io/react/',
        npmPackage: 'react',
        githubRepository: 'facebook/react',
        stackoverflowTags: 'reactjs'
      }),
      knex('references').insert({
        id: 7,
        key: 'vuejs',
        name: 'Vue.js',
        website: 'http://www.emberjs.com',
        npmPackage: 'ember-cli',
        githubRepository: 'vuejs/vue',
        stackoverflowTags: 'vue.js'
      }),
    ]);
  });
};
