const customerDao = require("../dao/customer.dao")

const customerService = {
    get: (customerId, callback) => {
        customerDao.get(customerId, (error, customers) => {
            if (error) return callback(error, undefined)
            if (customers) return callback(undefined, customers)
        })
    },
}

module.exports = customerService;