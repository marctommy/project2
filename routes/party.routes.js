const router = require("express").Router();
const Party = require("../models/Party.model");

router.get('/', (req, res) => {
  Party.find()
    .then((allparties) => {
      res.render('parties/parties-list', { allparties });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get('/create', (req, res) => {
  res.render('parties/parties-create');
});

router.post('/create', (req, res) => {
  const { name , location, date, start, music, category, description } = req.body;

  console.log(req.body)

  Party.create({ name , location, date, start, music, category, description })
    .then(() => {
      res.redirect('/parties');
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get('/:partyId', (req, res)=> {
  const { partyId } = req.params;
  Party.findById(partyId)
    .then((party) => {
      res.render('parties/parties-details', { party })
    })  
    .catch(err => {console.log(err)})
})    



module.exports = router;
