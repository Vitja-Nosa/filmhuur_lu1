const authService = require('../services/auth.service');
const encrypt = require('../util/encrypt')

const authController = {
    login: (req, res, next) => {
        if (req.method == "POST") {
            let { email, password } = req.body;
            authService.login(email, password, (error, user) => {
                if (error) {
                    req.flash('error', "Invalid email or password.");
                    console.log("error");
                    res.redirect("back");
                };
                if (user) {
                    req.session.user = user;
                    res.redirect("/customers");
                }
            })
        } else if (req.method == "GET") {
            res.render("auth/login", { error: req.flash("error") })
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

    },

    isGuest: (req, res, next) => {
        if (req.session.user) {
            return res.redirect('/customers');
        }
        next();
    }
}

module.exports = authController