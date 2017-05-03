const db = require('./_db');
const request = require('./_request');
const assert = require('chai').assert;

describe('donuteria api', () => {

  before(db.drop);

  it('initial GET returns empty list', () => {
    return request.get('/donuterias')
      .then(res => {
        const donuteria = res.body;
        assert.deepEqual(donuteria, []);
      });
  });
});