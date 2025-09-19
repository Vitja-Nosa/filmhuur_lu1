const authService = require('../services/auth.service');
const encrypt = require('../util/encrypt')

const authController = {
    login: (req, res, next) => {
        if (req.method == "POST") {
            let { email, password } = req.body;
            authService.login(email, password, (error, user) => {
                if (error) return next(error);
                if (user) {
                    req.session.user = user;
                    res.redirect("/customers");
                }
            })
        } else if (req.method == "GET") {
            res.render("auth/login")
        }
    },
    logout: (req, res, next) => {
        req.session.destroy(() => {
            res.redirect('/auth/login')
        })
    },

    isLoggedIn: (req, res, next) => {
        if (req.session.user) {
            return next()
        }
        return res.redirect("/auth/login");
        // const error = new Error('You must be logged in');
        // next(error);

    },

    isGuest: (req, res, next) => {
        if (req.session.user) {
            return res.redirect('/customers');
        }
        next();
    }
}

module.exports = authController