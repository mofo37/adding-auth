const Router = require('express').Router;
const router = Router();
const User = require('../models/user');
const ensureAuth = require('../auth/ensure-auth');
const tokenService = require('../auth/token-service');

function hasEmailandPassword(req, res, next) {
  const user = req.body;
  
  if (!user || !user.email || !user.password) {
    return next({
      code: 400,
      error: 'email and password required'
    });
  }
  
  next();
}

router
  .get('/verify', ensureAuth, (req, res) => {
    res.send({ valid: true });
  })

  .post('/signup', hasEmailandPassword, (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    delete req.body.password;

    User.exists({ email })
      .then(exists => {
        if(exists) { throw { code: 400, error: 'email in use'}; }

        const user = new User({ email });
        
        user.generateHash(password);
        return user.save();

      })
      .then(user => tokenService.sign(user))
      .then(token => res.send({ token }))
      .catch(next);
  })

  .post('/signin', hasEmailandPassword, (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    delete req.body.password;

    User.findOne({ email })
      .then(user => {
        if(!user || !user.comparePassword(password)) {
          throw { code: 401, error: 'Invalid login'};
        }
        return user;
      })
      .then(user => tokenService.sign(user))
      .then(token => res.send({ token }))
      .catch(next);
  });

module.exports = router;