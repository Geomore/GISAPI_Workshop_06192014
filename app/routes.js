var helperController = require('./controllers/helper_controller');
var geoController = require('./controllers/geographic_controller');

module.exports = function (app) {
    // set up the routes themselves

    //helper route
    app.get("/api", helperController.showAPIdocs);
    app.get("/api/status", helperController.showStorageAvailable);
    app.get('/api/homicideDateRange', helperController.homicideDateRange)

    //geo routes
    app.get("/api/boundingBox", geoController.boundingBox);
    app.get("/api/intersects", geoController.intersects);
    app.get("/api/filter", geoController.filters);
    app.get("/api/buffer", geoController.buffer);
    app.get("/api/nearClick", geoController.nearClick);
};