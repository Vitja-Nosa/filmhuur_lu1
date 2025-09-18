const customerService = require("../services/customer.service")

const customerController = {
    create: (req, res, next) => {
        if (req.method == 'GET') {
            res.reder('customers/create')
        } else if (req.method == 'POST') {
            let { first_name, last_name, email, active, address, district, city_id, postal_code, phone, location } = req.body
            console.log("address is: " + address);
            customerService.create(store_id, first_name, last_name, email, active, address, district, city_id, postal_code, phone, location,
                (error, results) => {
                    if (error) next(error)
                    if (results) {
                        console.log('customer created')
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
        customerService.delete(customerId, (error, results) => {
            if (error) {
                console.log(error)
            }
            if (results) {
                res.json({
                    status: 200,
                })
            }
        })
    }

}

module.exports = customerController;