const db = require('./helpers/db');
const request = require('./helpers/request');
const assert = require('chai').assert;

describe('auth', () => {

  before(db.drop);

  const user = {
    username: 'user',
    password: 'gef'
  };

  describe('user management', () => {

    const badRequest = (url, data, code, error) =>
      request
        .post(url)
        .send(data)
        .then(
        () => { throw new Error('status should not be okay'); },
        res => {
          assert.equal(res.status, code);
          assert.equal(res.response.body.error, error);
        }
        );


    it('signup requires username', () => {
      return badrequest('auth/signup', { password: 'gef' }, 400, 'username and password must be supplied');
    });

    it('signup requires password', () => {
      return badrequest('auth/signup', { password: 'gef' }, 400, 'username and password must be supplied');
    });

    let token = '';

    it('signup', () => {
      request
        .post('/auth/signup')
        .send(user)
        .then(res => {
          token = res.body.token;

          assert.ok(token);
        });
    });

    it('throws error if username already in use', () => {
      badRequest('/auth/signup', user, 400, 'email in use');
    });

  });
});
