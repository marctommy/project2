const router = require('express').Router();
const Party = require('../models/Party.model');
const User = require('../models/User.model')
const { ensureAuth, ensureGuest } = require('../config/auth');

router.get('/', (req, res, next) => {
  Party.find()
    .populate('user')
    .sort({ createAt: 'desc' })
    .lean()
    .then((allparties) => {
      console.log(allparties)
      res.render('parties/parties-list', { allparties });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get('/create', ensureAuth, (req, res) => {
  res.render('parties/parties-create');
});

router.post('/create', (req, res) => {
  req.body.user = req.user.id
  const { name, location, date, start, music, category, description, user } = req.body;
  Party.create({ name, location, date, start, music, category, description, user })
    .then(() => {
      res.redirect('/parties');
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get('/:partyId', ensureAuth, (req, res) => {
  const { partyId } = req.params;
  Party.findById(partyId)
    .then((party) => {
      res.render('parties/parties-details', { party });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get('/:partyId/edit', ensureAuth, (req, res, next) => {
  const { partyId } = req.params;

  Party.findById(partyId)
    .then((party) => {
      res.render('parties/parties-edit', { party });
    })
    .catch((error) => {
      console.log(error);
    });
});

router.post('/:partyId/edit', (req, res, next) => {
  const { partyId } = req.params;
  const { name, location, date, start, music, category, description } = req.body;

  Party.findByIdAndUpdate(partyId, { name, location, date, start, music, category, description }, { new: true })
    .then(() => {
      res.redirect('/parties');
    })
    .catch((error) => {
      console.log(error);
    });
});

router.post('/:partyId/delete', (req, res) => {
  const { partyId } = req.params;
  Party.findByIdAndDelete(partyId)
    .then(() => {
      res.redirect('/parties');
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
