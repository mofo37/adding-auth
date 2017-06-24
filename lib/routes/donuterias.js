const Router = require('express').Router;
const router = Router();
const Donuteria = require('../models/donuteria');

router
  .get('/', (req, res, next) => {
    Donuteria.find()
      .lean()
      .then(donuteria => res.send(donuteria))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    const id = req.params.id;
    Donuteria.findById(id).lean()
      .then(donuteria => {
        if (!donuteria) throw { code: 404, error: `${id} not found`};
        else res.send(donuteria);
      })
      .catch(next);
  })

  .post('/', (req, res, next) => {
    new Donuteria(req.body)
      .save()
      .then(donuteria => res.send(donuteria))
      .catch(next);
  });

module.exports = router;
