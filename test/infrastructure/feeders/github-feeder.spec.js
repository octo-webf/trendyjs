const chai = require('chai');
const expect = chai.expect;
const GithubFeeder = require('../../../lib/infrastructure/feeders/github-feeder');
const Service = require('../../../lib/domain/service');

function buildService(githubId) {
  return new Service({
    reference: {
      get() {
        return githubId;
      },
    },
  });
}

describe('Unit | Feeder | GithubFeeder', function () {
  describe('#fetchData()', function () {
    it('should add Github data to Service objects', function () {
      //given
      const services = [];
      const service1 = buildService('user1/repoA');
      const service2 = buildService('user2/repoB');
      const service3 = buildService('user3/repoC');
      services.push(service1, service2, service3);

      //when
      GithubFeeder.fetchData(services);

      //then
      expect(service1.github).to.exist;
    });
  });
});
