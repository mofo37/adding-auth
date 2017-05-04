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
  })

  .get('/:id', (req, res, next) => {
    const donuteriaId = res.params.id;
    Donuteria.findById(donuteriaId).lean()
      .then(result => {
        res.send(donuteria);
      })
      .catch(next);
  })

  .post('/', (req, res, next) => {
    new Donuteria(req.body)
      .save()
      .then(donuteria => res.send(donuteria))
      .catch(next);
  })

  .delete('/:id', (req, res) => {
    Donuteria.findByIdAndRemove(req.params.id)
      .then(donuteria => res.send({removed: !!donuteria}));
  });

module.exports = router;
