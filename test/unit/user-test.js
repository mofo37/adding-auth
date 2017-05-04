const assert = require('chai').assert;
const User = require('../../lib/models/user');

describe('user model', () => {

  it('new user generates hash', () => {
    const user = new User({
      userName: 'mofo37'
    });
    const password = 'fog';
    user.generateHash(password);

    assert.notEqual(user.hash, password);

    assert.isOk(user.comparePassword('fog'));
    assert.isNotOk(user.comparePassword('foijfrewfm'));
  });
});