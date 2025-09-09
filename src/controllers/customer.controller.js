const customerService = require("../services/customer.service")

const customerController = {
    get: (req, res, next) => {
        console.log("test")
        let customerId = req.params.customerId;
        customerService.get(customerId, (error, customers) => {
            if (error) next(error);

            if (customers) {
                res.render('customers', { customers: customers })
            }
        });
    },

}

module.exports = customerController;