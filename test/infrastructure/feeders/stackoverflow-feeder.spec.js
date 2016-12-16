const fs = require('fs');
const request = require('request');
const chai = require('chai');
const expect = chai.expect;
const StackOverflowFeeder = require('../../../lib/infrastructure/feeders/stackoverflow-feeder');
const Service = require('../../../lib/domain/service');
const sinon = require('sinon');

function buildService(stackoverflowTag) {
  return new Service({
    reference: {
      get() {
        return stackoverflowTag;
      },
    },
  });
}

describe('Unit | Feeder | StackOverflowFeeder', function () {
  describe('#feedData()', function () {

    let services;
    let stub;

    before(function () {
      services = [
        buildService('angularjs'),
        buildService('angular2'),
        buildService('aurelia')
      ];
    });

    afterEach(function () {
      request.get.restore();
    });

    it('should return a resolved promise with StackOverflow data added to Service objects', function (done) {
      //given
      const fixture = fs.readFileSync("./test/fixtures/stackoverflow.json");
      const fixtureJson = JSON.parse(fixture);
      stub = sinon.stub(request, 'get', (options, callback) => {
        callback(null, {}, fixture);
      });

      //when
      StackOverflowFeeder.feedData(services).then((services) => {

        //then
        services.forEach((service, i) => {
          expect(service.stackoverflow).to.deep.equal(fixtureJson.items[i]);
        });
        done();
      });
    });

    it('should return a rejected promise with error if it was thrown by StackOverflow client', (done) => {
      // given
      stub = sinon.stub(request, 'get', (options, callback) => {
        callback(new Error('Expected error.'));
      });

      //when
      StackOverflowFeeder.feedData(services).catch(err => {

        // then
        expect(err.message).to.equal('Expected error.');
        done();
      })
    })
  });
});
