const db = require('./_db');
const request = require('./_request');
const assert = require('chai').assert;

describe('donuteria api', () => {

  before(db.drop);

  let token = '';

  const user = {
    email: 'user',
    password: 'abc'
  };

  it('signs in a user', () => {
    return request.post('/auth/signin')
      .set('Authorization', token)
      .send(user);
  });

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

  function saveDonuteria(donuteria) {
    return request
      .post('/donuterias')
      .send(donuteria)
      .then(res => res.body);
  }

  it('roundtrips a new donuteria', () => {
    return saveDonuteria(uptown)
      .then(saved => {
        assert.isOk(saved._id);
        uptown = saved;
      })
      .then(() => {
        return request.get(`/donuterias/${uptown._id}`);
      })
      .then(res => res.body)
      .then(got => {
        assert.deepEqual(got, uptown);
      });
  });
});