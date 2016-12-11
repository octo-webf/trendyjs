const chai = require('chai');
const expect = chai.expect;
const Service = require('../../lib/domain/service');

describe('Unit | Domain | Service', function () {
  it('should exist', function () {
    // given
    const options = {reference: 'test'};

    // when
    const service = new Service(options);

    // then
    expect(service.reference).to.equal('test');
    expect(service.npmjs).to.exist;
    expect(service.github).to.exist;
    expect(service.stackoverflow).to.exist;
  });
});