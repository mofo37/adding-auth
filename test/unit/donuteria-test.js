// const assert = require('chai').assert;
const Donuteria = require('../../lib/models/donuteria');

// const expectedValidation = () => { throw new Error('expected validation errors'); };

describe('donuteria model', () => {

  it('validates a good model', () => {
    const donuteria = new Donuteria({ name: 'Downtown' });
    return donuteria.validate();
  });
});