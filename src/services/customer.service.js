const customerDao = require("../dao/customer.dao")
const { expect } = require('chai')

const customerService = {
    validate: (req, customerId) => {
        // { }
        // try {
        //     expect()
        // }
        // catch (error) {
        //     throw error
        // }
    },

    get: (customerId, callback) => {
        customerDao.get(customerId, (error, customers) => {
            if (error) return callback(error, undefined)
            if (customers) return callback(undefined, customers)
        })
    },
}

module.exports = customerService;