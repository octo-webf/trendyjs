const chai = require('chai');
const server = require('../../../server');
const sinon = require('sinon');
const ServiceController = require('../../../lib/application/services/service-controller');
const Cache = require('../../../lib/infrastructure/cache');

describe('Unit | Controller | ServiceController', function () {
  describe('#find', function () {
    describe('when the request has been cached', function () {
      let stub;

      beforeEach(function () {
        stub = sinon.stub(Cache, 'get');
      });

      afterEach(function () {
        Cache.get.restore();
      });

      it('should return cached response', function () {
        // given
        const request = {};
        const reply = sinon.stub();
        const response = { services: ['service 1', 'service 2', 'service 3'] };
        stub.returns(response);

        // when
        ServiceController.find(request, reply);

        // then
        sinon.assert.calledWith(reply, response);
      });
    });

  });
});