const customerService = require("../services/customer.service")
const cityService = require("../services/city.service")
const storeService = require("../services/store.service")
const paymentService = require("../services/payment.service");
const rentalService = require("../services/rental.service");

const { expect } = require('chai')

const customerController = {
    validate: (req, res, next) => {
        try {
            const { store_id, first_name, last_name, email, address, district, city_id, postal_code, phone } = req.body;
            expect(store_id, 'Store is required').to.exist.and.to.not.be.empty;
            expect(first_name, 'First name is required').to.exist.and.to.not.be.empty;
            expect(last_name, 'Last name is required').to.exist.and.to.not.be.empty;
            expect(email, 'Email is required').to.exist.and.to.not.be.empty;
            expect(address, 'Address is required').to.exist.and.to.not.be.empty;
            expect(district, 'District is required').to.exist.and.to.not.be.empty;
            expect(city_id, 'City is required').to.exist.and.to.not.be.empty;
            expect(postal_code, 'Postal code is required').to.exist.and.to.not.be.empty;
            expect(phone, 'Phone is required').to.exist.and.to.not.be.empty;
            expect(Number.isInteger(Number(store_id)), 'Store id must be an number').to.be.true;
            expect(Number.isInteger(Number(phone)), 'Phone must be an number').to.be.true;
            next();
        } catch (err) {
            req.flash('error', err.message);
            return res.redirect('back');
        }
    },

    create: (req, res, next) => {
        console.log("testing");
        if (req.method == 'GET') {
            cityService.get((error, cities) => {
                if (error) next(error)
                if (cities) {
                    storeService.get((error, stores) => {
                        if (error) next(error)
                        if (stores) res.render('customers/create', { cities: cities, stores: stores, error: req.flash('error') })
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
                    storeService.get((error, stores) => {
                        if (error) next(error);
                        if (stores) {
                            res.render('customers/detail', { customer: customers[0], stores: stores })
                        }
                    })
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
                    cityService.get((error, cities) => {
                        if (error) next(error)
                        if (cities) {
                            storeService.get((error, stores) => {
                                if (error) next(error);
                                if (stores) {
                                    console.log("edit controller: " + req.flash("error"))
                                    res.render('customers/edit', { customer: customers[0], stores: stores, cities: cities, error: req.flash("error") })
                                }
                            })
                        }
                    })
                }
            })
        } else if (req.method == "POST") {
            let { store_id, first_name, last_name, email, active, address, district, city_id, postal_code, phone } = req.body
            customerService.update(customerId, store_id, first_name, last_name, email, active, address, district, city_id, postal_code, phone, (error, results) => {
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