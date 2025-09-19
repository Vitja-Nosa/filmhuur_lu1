var express = require('express');
var router = express.Router();

const filmController = require('../controllers/film.controller');
const authController = require('../controllers/auth.controller');

router.get('/', authController.isLoggedIn, filmController.get);

module.exports = router;