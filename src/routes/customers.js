var express = require('express');
var router = express.Router();

const customerController = require('../controllers/customer.controller');
const authController = require('../controllers/auth.controller');

/* GET users listing. */
router.get('/', authController.isLoggedIn, customerController.get);
router.get('/:customerId', authController.isLoggedIn, customerController.get);

router.get('/create', authController.isLoggedIn, customerController.create);
router.post('/create', customerController.create);

router.get('/edit/:customerId', authController.isLoggedIn, customerController.edit);
router.post('/edit/:customerId', authController.isLoggedIn, customerController.edit);

router.delete('/delete/:customerId', authController.isLoggedIn, customerController.delete);

module.exports = router;