const filmService = require("../services/film.service");

const filmController = {
    get: (req, res, next) => {
        filmService.get((error, films) => {
            if (error) return next(error);
            if (films) {
                res.render('films/index', { films: films });
            }
        });
    }
};

module.exports = filmController;
