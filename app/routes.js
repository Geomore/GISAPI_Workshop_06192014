var helperController = require('./controllers/helper_controller');

module.exports = function (app) {
    // set up the routes themselves

    //helper route
    app.get("/api", helperController.showAPIdocs);
    app.get("/api/status", helperController.showStorageAvailable);

    app.get("/api/boundingBox", function (req, res) {
        res.jsonp('boundingbox');
    });

    app.get("/api/overlap", function (req, res) {
        res.jsonp('overlap');
    });

    app.get("/api/simplify", function (req, res) {
        res.jsonp('simplify');
    });

    app.get("/api/buffer", function (req, res) {
        res.jsonp('buffer');
    });

    app.get("/api/funFilter", function (req, res) {
        res.jsonp('funFilter');
    });
};