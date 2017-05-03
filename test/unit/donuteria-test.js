const assert = require('chai').assert;
const Donuteria = require('../../lib/models/donuteria');

const expectedValidation = () => { throw new Error('expected validation errors'); };

describe('donuteria model', () => {

  it('validates a good model', () => {
    const donuteria = new Donuteria({ name: 'Downtown' });
    return donuteria.validate();
  });
});

describe('validation failures', () => {

  it.only('name is required', () => {
    const donuteria = new Donuteria();
    return donuteria.validate()
      .then(expectedValidation,
      err => {
        const errors = err.errors;
        assert.ok(errors.name && errors.name.kind === 'required');

      });
  });
});