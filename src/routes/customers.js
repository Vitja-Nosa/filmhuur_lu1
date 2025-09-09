var express = require('express');
var router = express.Router();

const customerController = require('../controllers/customer.controller');

/* GET users listing. */
router.get('/', customerController.get);
router.get('/:customerId', customerController.get);

// router.delete('/:customerId', customerController.delete);

module.exports = router;