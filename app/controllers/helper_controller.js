'use strict';
/**
 * A module that defines the response format.
 * @module app_schema_controller
 */
var fs = require('fs'),
	diskspace = require('diskspace');

exports.showAPIdocs = function(req, res) {
	var update = 'GISAPI Workshop API Docs</br>' + 
        		 '</br></br><b>Helpers</b></br>' +
        		 'GET /api</br>' +
        		 'GET /api/showStorageAvailable</br></br></br>' +
        		 '<b>Geo Services</b></br>' + 
        		 'GET /api/boundingBox </br>' + 
        		 'GET /api/overlap </br>' + 
        		 'GET /api/simplify </br>' + 
        		 'GET /api/buffer </br>' + 
        		 'GET /api/funFilter'
    res.send(update)
}

exports.showStorageAvailable = function(req, res) {
	diskspace.check('/', function (total, free, status){
		//convert to gigabytes
	    res.jsonp({
	    	total:(total/1000000000),
	    	free:(free/1000000000),
	    	status:status
	    })
	});
}