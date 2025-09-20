const customerService = require("../services/customer.service")
const cityService = require("../services/city.service")
const storeService = require("../services/store.service")
const paymentService = require("../services/payment.service");
const rentalService = require("../services/rental.service");
const { body, validationResult } = require('express-validator');

const customerController = {
    validate: [
        body('store_id').notEmpty().withMessage('Store is required').isInt().withMessage('Store id must be a number'),
        body('first_name').notEmpty().withMessage('First name is required'),
        body('last_name').notEmpty().withMessage('Last name is required'),
        body('email').notEmpty().withMessage('Email is required'),
        body('address').notEmpty().withMessage('Address is required'),
        body('district').notEmpty().withMessage('District is required'),
        body('city_id').notEmpty().withMessage('City is required'),
        body('postal_code').notEmpty().withMessage('Postal code is required'),
        body('phone').notEmpty().withMessage('Phone is required').isInt().withMessage('Phone must be a number'),
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                req.flash('error', errors.array()[0].msg);
                return res.redirect('back');
            }
            next();
        }
    ],

    create: (req, res, next) => {
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
                        req.flash('success', "Customer has been created.");
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
                    res.render('customers/index', { customers: customers, success: req.flash("success") })
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
                    req.flash('success', "Customer has been updated.");
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
                        req.flash('success', "Customer has been deleted.");
                        res.redirect('/customers');
                    }
                });
            });
        });
    }

}

module.exports = customerController;