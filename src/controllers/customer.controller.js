const customerService = require("../services/customer.service")
const cityService = require("../services/city.service")
const storeService = require("../services/store.service")
const paymentService = require("../services/payment.service");
const rentalService = require("../services/rental.service");

const customerController = {
    create: (req, res, next) => {
        console.log("testing");
        if (req.method == 'GET') {
            cityService.get((error, cities) => {
                if (error) next(error)
                if (cities) {
                    storeService.get((error, stores) => {
                        if (error) next(error)
                        if (stores) res.render('customers/create', { cities: cities, stores: stores })
                    })
                }
            })
        } else if (req.method == 'POST') {
            let { store_id, first_name, last_name, email, active, address, district, city_id, postal_code, phone } = req.body
            customerService.create(store_id, first_name, last_name, email, active, address, district, city_id, postal_code, phone,
                (error, results) => {
                    if (error) next(error)
                    if (results) {
                        res.redirect('/customers');
                    }
                })
        }
    },

    get: (req, res, next) => {
        let customerId = req.params.customerId;
        customerService.get(customerId, (error, customers) => {
            if (error) next(error);

            if (customers) {
                if (customerId == undefined) {
                    res.render('customers/index', { customers: customers })
                } else {
                    res.render('customers/detail', { customer: customers[0] })
                }
            }
        });
    },

    edit: (req, res, next) => {
        let customerId = req.params.customerId;
        if (req.method == 'GET') {
            customerService.get(customerId, (error, customers) => {
                if (error) next(error);
                if (customers) {
                    res.render('customers/edit', { customer: customers[0] });
                }
            })
        } else if (req.method == "POST") {
            let { first_name, last_name, email, active, address, phone } = req.body
            customerService.update(customerId, first_name, last_name, email, active, address, phone, (error, results) => {
                if (error) {
                    next(error);
                };
                if (results) {
                    res.redirect('/customers');
                }
            })
        }
    },

    delete: (req, res, next) => {
        let customerId = req.params.customerId;
        paymentService.delete(customerId, (error, results) => {
            if (error) return next(error);
            rentalService.delete(customerId, (error, results) => {
                if (error) return next(error);
                customerService.delete(customerId, (error, results) => {
                    if (error) return next(error);
                    if (results) {
                        res.redirect('/customers');
                    }
                });
            });
        });
    }

}

module.exports = customerController;