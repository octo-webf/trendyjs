const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const DataFeeder = require('../../../lib/infrastructure/feeders/data-feeder');
const Service = require('../../../lib/domain/service');

function buildService(serviceId) {
  return new Service({
    reference: {
      get() {
        return serviceId;
      },
    },
  });
}

describe('Unit | Feeder | DataFeeder', function () {

  describe('#feedData()', function () {
    it('should only return a resolved promise with given services', function (done) {
      // given
      const inputServices = [
        buildService('angular'),
        buildService('angular2'),
        buildService('aurelia'),
      ];
      const dataFeeder = new DataFeeder();

      // when
      dataFeeder.feedData(inputServices).then((services) => {

        // then
        expect(services).to.deep.equal(inputServices);
        done();
      });
    });
  });

});