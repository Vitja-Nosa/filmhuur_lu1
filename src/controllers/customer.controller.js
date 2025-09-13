const customerService = require("../services/customer.service")

const customerController = {
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
                if (customers && customerId !== undefined) {
                    res.render('customers/edit', { customer: customers[0] });
                }
            })
        } else if (req.method == "POST") {
            let { first_name, last_name, email, active } = req.body
            customerService
        }
    }

}

module.exports = customerController;