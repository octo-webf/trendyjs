const fs = require('fs');
const request = require('request');
const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const NpmjsFeeder = require('../../../lib/infrastructure/feeders/npmjs-feeder');
const Service = require('../../../lib/domain/service');

function buildService(packageName) {
  return new Service({
    reference: {
      get() {
        return packageName;
      },
    },
  });
}

describe('Unit | Feeder | NpmjsFeeder', function () {
  describe('#feedData()', function () {

    let services;
    let stub;

    before(function () {
      services = [
        buildService('angular'),
        buildService('angular2'),
        buildService('aurelia')
      ];
    });

    afterEach(function () {
      request.get.restore();
    });

    it('should return a resolved promise with NPM.js data added to Service objects', function (done) {
      //given
      const fixtures = {};
      fixtures['last-day'] = fs.readFileSync("./test/fixtures/npmjs_lastDay.json");
      fixtures['last-week'] = fs.readFileSync("./test/fixtures/npmjs_lastWeek.json");
      fixtures['last-month'] = fs.readFileSync("./test/fixtures/npmjs_lastMonth.json");

      stub = sinon.stub(request, 'get', (uri, callback) => {
        const point = /^https:\/\/api\.npmjs\.org\/downloads\/point\/(.*)\/.*$/.exec(uri)[1];
        callback(null, {}, fixtures[point]);
      });

      //when
      NpmjsFeeder.feedData(services).then((services) => {

        //then
        services.forEach((service) => {
          expect(service.npmjs).to.exist;
          expect(service.npmjs.lastDay).to.deep.equal(JSON.parse(fixtures['last-day'])[service.reference.get('npmjs')]);
          expect(service.npmjs.lastWeek).to.deep.equal(JSON.parse(fixtures['last-week'])[service.reference.get('npmjs')]);
          expect(service.npmjs.lastMonth).to.deep.equal(JSON.parse(fixtures['last-month'])[service.reference.get('npmjs')]);
        });
        done();
      });
    });

    it('should return a rejected promise with error if it was thrown by NPM.js request', (done) => {
      // given
      stub = sinon.stub(request, 'get', (options, callback) => {
        callback(new Error('Expected error.'));
      });

      //when
      NpmjsFeeder.feedData(services).catch(err => {

        // then
        expect(err.message).to.equal('Expected error.');
        done();
      })
    })
  });
});
