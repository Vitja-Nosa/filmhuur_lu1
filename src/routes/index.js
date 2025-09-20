var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/about', function (req, res, next) {
  res.render('about');
});

router.get('/', function (req, res, next) {
  res.redirect('/films');
});

module.exports = router;
