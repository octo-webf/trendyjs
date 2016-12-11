const GithubClient = require('../github-client');
const DataFeeder = require('./data-feeder');
const Logger = require('./../logger');

class GithubAdapter extends DataFeeder {
  feedData(services) {
    return new Promise((resolve, reject) => {
      const promises = [];
      services.forEach((service) => {
        const github = service.reference.get('github');
        const ids = github.split('/');
        const userName = ids[0];
        const repoName = ids[1];
        const repository = GithubClient.getRepo(userName, repoName);
        promises.push(repository.getDetails((err, result) => {
          if (err) {
            Logger.error('An error occurred');
            Logger.error(err.message);
          }
          service.github = result;
        }));
      });

      Promise.all(promises)
        .then(() => {
          Logger.debug('GitHub data loaded');
          resolve(services);
        })
        .catch(err => reject(err));
    });
  }
}

module.exports = new GithubAdapter();
