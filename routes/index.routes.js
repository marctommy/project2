const router = require("express").Router();
const { ensureProfile } = require('../config/auth')


/* GET home page */
router.get("/", ensureProfile, (req, res, next) => {
    const { id } = req.user
    res.render('index', { style: 'style.css', id})
});

module.exports = router;
