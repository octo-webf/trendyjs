const GitHub = require('github-api');
const DataFeeder = require('./data-feeder');
const Logger = require('./../logger');

class GithubAdapter extends DataFeeder {
  feedData(services) {
    return new Promise((resolve, reject) => {
      const gh = new GitHub({ token: 'f27526c811561075b86c63972c2d566f99ab4d6b' });
      const promises = [];

      services.forEach((service) => {
        const github = service.reference.get('github');
        const ids = github.split('/');
        const user = ids[0];
        const repo = ids[1];
        promises.push(gh.getRepo(user, repo).getDetails((err, result) => {
          service.github = result;
        }));
      });

      Promise.all(promises)
        .then(() => {
          Logger.info('GitHub data loaded');
          resolve(services);
        })
        .catch(err => reject(err));
    });
  }
}

module.exports = new GithubAdapter();
