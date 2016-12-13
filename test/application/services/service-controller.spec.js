const chai = require('chai');
const expect = chai.expect;
const server = require('../../../server');
const sinon = require('sinon');
const ServiceController = require('../../../lib/application/services/service-controller');
const Cache = require('../../../lib/infrastructure/cache');

describe('Unit | Controller | ServiceController', function () {
  describe('#find', function () {

    let stub;

    beforeEach(function () {
      stub = sinon.stub(Cache, 'get');
    });

    afterEach(function () {
      stub.restore();
    });

    it('should return cached response if it exists without making other treatments', function () {
      // given
      const request = {};
      const reply = sinon.stub();
      const response = { services: ['service 1', 'service 2', 'service 3'] };
      stub.returns(response);

      // when
      ServiceController.find(request, reply);

      // then
      sinon.assert.calledOnce(stub);
      sinon.assert.calledWith(reply, response);
    });
  });
});