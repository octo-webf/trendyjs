const chai = require('chai');
const expect = chai.expect;
const server = require('../../../server');
const sinon = require('sinon');
const ServiceController = require('../../../lib/application/services/service-controller');
const NpmjsFeeder = require('../../../lib/infrastructure/feeders/npmjs-feeder');
const GithubFeeder = require('../../../lib/infrastructure/feeders/github-feeder');
const StackoverflowFeeder = require('../../../lib/infrastructure/feeders/stackoverflow-feeder');

describe('Unit | Route | Services', function () {
  describe('GET api/services', function () {

    before(function () {
      sinon.stub(ServiceController, 'find', (request, reply) => reply([]));
      sinon.stub(NpmjsFeeder, 'feedData').returns(Promise.resolve([]));
      sinon.stub(GithubFeeder, 'feedData').returns(Promise.resolve([]));
      sinon.stub(StackoverflowFeeder, 'feedData').returns(Promise.resolve([]));
    });

    after(function () {
      ServiceController.find.restore();
      NpmjsFeeder.feedData.restore();
      GithubFeeder.feedData.restore();
      StackoverflowFeeder.feedData.restore();
    });

    it('should exist', function () {
      server.inject({ method: 'GET', url: '/api/services', payload: {} }).then((response) => {
        expect(response.statusCode).to.equal(200);
      });
    });
  })

});
