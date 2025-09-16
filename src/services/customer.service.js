const customerDao = require("../dao/customer.dao")
const { expect } = require('chai')

const customerService = {
    validate: (req, customerId) => {
        try {
            expect(req)
        }
        catch (error) {
            console.log(error);
        }
    },

    get: (customerId, callback) => {
        customerDao.get(customerId, (error, customers) => {
            if (error) return callback(error, undefined)
            if (customers) return callback(undefined, customers)
        })
    },

    update: (customerId, first_name, last_name, email, active, address, phone, callback) => {
        active = active == 'on' ? 1 : 0;
        customerDao.update(customerId, first_name, last_name, email, active, address, phone, (error, results) => {
            if (error) return callback(error, undefined);
            if (results) return callback(undefined, results)
        })
    },

    delete: (customerId, callback) => {
        customerDao.delete(customerId, (error, results) => {
            if (error) return callback(error, undefined);
            if (results) return callback(undefined, results);
        })
    }
}

module.exports = customerService;