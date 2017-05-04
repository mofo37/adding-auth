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

  let uptown = {
    name: 'Uptown'
  };

  function saveDonuteria(donuteria){
    return request
      .post('/donuterias')
      .send(donuteria)
      .then(res => res.body);
  }

  it('roundtrips a new donuteria', () => {
    return saveDonuteria(uptown)
      .then(saved => {
        uptown = saved;
      })
      .then(() => {
        return request.get(`/donuterias/${uptown}`);
      })
      .then(res => res.body)
      .then(got => {
        assert.deepEqual(got, Object.assign(uptown));
      });
  });
});