const rentalDao = require('../dao/rental.dao')

const rentalService = {
    delete: (customerId, callback) => {
        rentalDao.delete(customerId, (error, results) => {
            if (error) return callback(error, undefined)
            else return callback(undefined, results)
        })
    }
}

module.exports = rentalService;
