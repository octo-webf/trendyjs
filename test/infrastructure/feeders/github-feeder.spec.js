const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
const GithubFeeder = require('../../../lib/infrastructure/feeders/github-feeder');
const Service = require('../../../lib/domain/service');
const GithubClient = require('../../../lib/infrastructure/github-client');

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
  describe('#feedData()', function () {

    let services;
    let stub;

    before(function () {
      services = [];
      services.push(buildService('user1/repoA'));
      services.push(buildService('user2/repoB'));
      services.push(buildService('user3/repoC'));
    });

    afterEach(function () {
      GithubClient.getRepo.restore();
    });

    it('should add Github data to Service objects', function (done) {
      //given
      stub = sinon.stub(GithubClient, 'getRepo', () => {
        return { getDetails(cb) {
          return new Promise((resolve) => {
            let result = {};
            result.id = Math.random() * (10000 - 1000) + 1000;
            result.name = 'toto';
            cb(null, result);
            resolve();
          });
        }};
      });

      //when
      GithubFeeder.feedData(services).then((services) => {

        //then
        services.forEach((service) => {
          expect(service.github.id).to.exist;
          expect(service.github.name).to.equal('toto');
        });
        done();
      });
    });

    it('should reject with error if thrown by GitHub client', function (done) {
      // given
      stub = sinon.stub(GithubClient, 'getRepo', () => {
        return { getDetails() {
          return new Promise((resolve, reject) => {
            reject(new Error('expected error'));
          })
        }};
      });

      //when
      GithubFeeder.feedData(services).catch(err => {

        // then
        expect(err.message).to.equal('expected error');
        done();
      })
    })
  });
});
