const userService = require("../services/user.service")

const userController = {
    get: (req, res, next) => {
        let userId = req.params.userId;
        userService.get(userId, (error, users) => {
            if (error) next(error);

            if (users) {
                res.render('users', { users: users })
            }
        });
    },

    delete: (req, res, next) => {
        let userId = req.params.userId;
        userService.delete(userId, (error, result) => {
            if (error) next(error);
            if (result) res.send("User has been deleted");
        })
    }
}

module.exports = userController;