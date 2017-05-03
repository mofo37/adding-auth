const Router = require('express').Router;
const router = Router();
const Donuteria = require('../models/donuteria');
// const User = require('/models/user');

router
  .get('/', (req, res, next) => {
    Donuteria.find()
      .lean()
      .then(donuteria => res.send(donuteria))
      .catch(next);
  });

module.exports = router;
