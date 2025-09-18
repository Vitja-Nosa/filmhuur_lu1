const customerDao = require("../dao/customer.dao")
const addressDao = require("../dao/address.dao")

const { expect } = require('chai')

const customerService = {
    create: (store_id, first_name, last_name, email, active, address, district, city_id, postal_code, phone, callback) => {
        active = active == 'on' ? 1 : 0;
        var address_id = undefined;
        addressDao.create(address, district, city_id, postal_code, phone, (error, result) => {
            if (error) return callback(error, undefined)
            if (result) {
                address_id = result.insertId
                customerDao.create(store_id, first_name, last_name, email, address_id, active, (error, results) => {
                    if (error) return callback(error, undefined);
                    if (results) return callback(undefined, results)
                });
            }
        })
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