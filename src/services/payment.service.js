const paymentDao = require('../dao/payment.dao')

const paymentService = {
    delete: (customerId, callback) => {
        paymentDao.delete(customerId, (error, results) => {
            if (error) return callback(error, undefined)
            else return callback(undefined, results)
        })
    }
}

module.exports = paymentService;
