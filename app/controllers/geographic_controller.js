'use strict';
/*stuff go in, stuff come out*/
exports.boundingBox = function(req, res, next) {
    var swX = req.query.swX,
    swY = req.query.swY,
    neX = req.query.neX,
    neY = req.query.neY;

    //if the bounding box has three values come in on param...
	if(swX && swY && neX && neY){
        //do query
    }
    else{
        //send failuer
    }
}

exports.overlap = function(req, res, next) {
    //stuff
}

exports.simplify = function(req, res, next) {
    //stuff
}

exports.buffer = function(req, res, next) {
    //stuff
}

exports.funFilter = function(req, res, next) {
    //stuff
}