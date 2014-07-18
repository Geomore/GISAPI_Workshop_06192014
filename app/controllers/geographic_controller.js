'use strict';

/*
data used:
homicides CSV:  https://data.baltimorecity.gov/Public-Safety/Homicides/9h5s-7d88
*/


var pg = require('pg');
var connstring = "postgres://postgres:password1@127.0.0.1:5432/postgisfun";

/* 
this makes geojson output possible
*/
function FeatureCollection(){
    this.type = 'FeatureCollection';
    this.features = new Array();
    this.metadata = new Array();
}

function Feature(){
    this.type = 'Feature';
    this.geometry = new Object;
    this.properties = new Object;
} 

// function MetaData(){
//     this.type = 'Metadata';
//     this.metadata = new Array();
// }

/*stuff go in, stuff come out*/
exports.boundingBox = function(req, res, next) {
    var swX = req.query.swX,
        swY = req.query.swY,
        neX = req.query.neX,
        neY = req.query.neY;

    //if the bounding box has three values come in on param...
	if(swX && swY && neX && neY){
        pg.connect(connstring, function(err, client, done) {
            var handleError = function(err) {
                if(!err) return false;
                done(client);
                next(err);
                return true;

            };
            //var myQuery = "SELECT *, ST_AsGeoJSON(geom) AS geography FROM homicides WHERE ST_CoveredBy(geom, ST_GeometryFromText ('POLYGON((" + swX + " " + swY + "," + neX + " " + swY + "," + neX + " " + neY + "," + swX + " " + neY + ","+ swX + " " + swY + "))', 4326 ));"
            var buildQuery = [
                "SELECT *, ST_AsGeoJSON(geom) AS geography",
                "FROM homicides",
                "WHERE ST_CoveredBy(geom, ST_GeometryFromText ('POLYGON((" + swX + " " + swY + "," + neX + " " + swY + "," + neX + " " + neY + "," + swX + " " + neY + ","+ swX + " " + swY + "))', 4326 ));"
            ]
            var myQuery = buildQuery[0] + ' ' + buildQuery[1] + ' ' + buildQuery[2];
            // for (var i in buildQuery){
            //     myQuery = myQuery + String(buildQuery[i]) + ' '
            // }
            client.query(myQuery, function(err, result) {
                // console.log(result.rowCount)
                console.log(result)
                if(result.rowCount == 0) {
                  res.send(500);
                } 
                else {
                  var featureCollection = new FeatureCollection();
                  // var metadata = new MetaData();
                  for(var i=0; i<result.rowCount; i++){
                    var feature = new Feature();
                    //feature.properties = ({"city_name":result.rows[i].city_name, "cntry_name":result.rows[i].cntry_name, "pop":result.rows[i].pop});
                    feature.properties = ({
                        "desc":result.rows[i].description, 
                        "date":result.rows[i].crimedate,
                        "crimetime":result.rows[i].crimetime,
                        "weapon":result.rows[i].weapon
                    })
                    feature.geometry = JSON.parse(result.rows[i].geography);
                    featureCollection.features.push(feature);
                  }
                  featureCollection.metadata.push(buildQuery)
                  res.type('text/javascript');
                  res.jsonp(featureCollection);
                  done();
                }
            });
        })

    }
    else{
        //send failuer
    }
}

exports.filters = function(req, res, next) {
    var swX = req.query.swX,
        swY = req.query.swY,
        neX = req.query.neX,
        neY = req.query.neY,
        startDate = req.query.startDate,
        endDate = req.query.endDate,
        weapon = req.query.weapon;

    //if the bounding box has three values come in on param...
    if(swX && swY && neX && neY && startDate && endDate){
        pg.connect(connstring, function(err, client, done) {
            var handleError = function(err) {
                if(!err) return false;
                done(client);
                next(err);
                return true;

            };

            var myQuery = "SELECT *, ST_AsGeoJSON(geom) AS geography FROM homicides WHERE ST_CoveredBy(geom, ST_GeometryFromText ('POLYGON((" + swX + " " + swY + "," + neX + " " + swY + "," + neX + " " + neY + "," + swX + " " + neY + ","+ swX + " " + swY + "))', 4326 )) AND (crimedate >= to_date('" + startDate + "','YYYY-MM-DD') AND (crimedate <= to_date('" + endDate + "', 'YYY-MM-DD')))"
            
            if((weapon != 'ALL') && (weapon)){
                myQuery = myQuery + " AND weapon = '" + weapon + "'"
            };
            console.log(myQuery)
            client.query(myQuery, function(err, result) {
                // console.log(result.rowCount)
                if(result.rowCount == 0) {
                  res.send(500);
                } 
                else {
                  var featureCollection = new FeatureCollection();
                  for(var i=0; i<result.rowCount; i++){
                    var feature = new Feature();
                    //feature.properties = ({"city_name":result.rows[i].city_name, "cntry_name":result.rows[i].cntry_name, "pop":result.rows[i].pop});
                    feature.properties = ({
                        "desc":result.rows[i].description, 
                        "date":result.rows[i].crimedate,
                        "crimetime":result.rows[i].crimetime,
                        "weapon":result.rows[i].weapon,
                    })
                    feature.geometry = JSON.parse(result.rows[i].geography);
                    featureCollection.features.push(feature);
                  }
                  res.type('text/javascript');
                  res.jsonp(featureCollection);
                  done();
                }
            });
        })

    }
    else{
        //send failuer
    }
}

exports.intersects = function(req, res, next) {
    var swX = req.query.swX,
        swY = req.query.swY,
        neX = req.query.neX,
        neY = req.query.neY,
        startDate = req.query.startDate,
        endDate = req.query.endDate,
        weapon = req.query.weapon;

    //if the bounding box has three values come in on param...
    if(swX && swY && neX && neY && startDate && endDate){
        pg.connect(connstring, function(err, client, done) {
            var handleError = function(err) {
                if(!err) return false;
                done(client);
                next(err);
                return true;

            };

            var myQuery = "SELECT *, ST_AsGeoJSON(geom) AS geography FROM homicides WHERE ST_CoveredBy(geom, ST_GeometryFromText ('POLYGON((" + swX + " " + swY + "," + neX + " " + swY + "," + neX + " " + neY + "," + swX + " " + neY + ","+ swX + " " + swY + "))', 4326 )) AND (crimedate >= to_date('" + startDate + "','YYYY-MM-DD') AND (crimedate <= to_date('" + endDate + "', 'YYY-MM-DD')))"
            if((weapon != 'ALL') && (weapon)){
                myQuery = myQuery + " AND weapon = '" + weapon + "'"
            }
            console.log(myQuery)
            client.query(myQuery, function(err, result) {
                // console.log(result.rowCount)
                if(result.rowCount == 0) {
                  res.send(500);
                } 
                else {
                  var featureCollection = new FeatureCollection();
                  for(var i=0; i<result.rowCount; i++){
                    var feature = new Feature();
                    //feature.properties = ({"city_name":result.rows[i].city_name, "cntry_name":result.rows[i].cntry_name, "pop":result.rows[i].pop});
                    feature.properties = ({
                        "desc":result.rows[i].description, 
                        "date":result.rows[i].crimedate,
                        "crimetime":result.rows[i].crimetime,
                        "weapon":result.rows[i].weapon,
                    })
                    feature.geometry = JSON.parse(result.rows[i].geography);
                    featureCollection.features.push(feature);
                  }
                  res.type('text/javascript');
                  res.jsonp(featureCollection);
                  done();
                }
            });
        })

    }
    else{
        //send failuer
    }
}

exports.buffer = function(req, res, next) {
    var swX = req.query.swX,
        swY = req.query.swY,
        neX = req.query.neX,
        neY = req.query.neY,
        startDate = req.query.startDate,
        endDate = req.query.endDate,
        weapon = req.query.weapon,
        bufferDistance = req.query.buffer;
        console.log(bufferDistance)
    //if the bounding box has three values come in on param...
    if(swX && swY && neX && neY && startDate && endDate){
        pg.connect(connstring, function(err, client, done) {
            var handleError = function(err) {
                if(!err) return false;
                done(client);
                next(err);
                return true;

            };
            if(bufferDistance != '0'){
                var myQuery = "SELECT ST_AsGeoJSON(st_union(ST_Transform(ST_Buffer(ST_Transform(geom,26985),"+bufferDistance+"),4326))) AS geography FROM homicides WHERE ST_CoveredBy(geom, ST_GeometryFromText ('POLYGON((" + swX + " " + swY + "," + neX + " " + swY + "," + neX + " " + neY + "," + swX + " " + neY + ","+ swX + " " + swY + "))', 4326 )) AND (crimedate >= to_date('" + startDate + "','YYYY-MM-DD') AND (crimedate <= to_date('" + endDate + "', 'YYY-MM-DD')))"
            }
            else{
                var myQuery = "SELECT *, ST_AsGeoJSON(geom) AS geography FROM homicides WHERE ST_CoveredBy(geom, ST_GeometryFromText ('POLYGON((" + swX + " " + swY + "," + neX + " " + swY + "," + neX + " " + neY + "," + swX + " " + neY + ","+ swX + " " + swY + "))', 4326 )) AND (crimedate >= to_date('" + startDate + "','YYYY-MM-DD') AND (crimedate <= to_date('" + endDate + "', 'YYY-MM-DD')))"
            }
            if((weapon != 'ALL') && (weapon)){
                myQuery = myQuery + " AND weapon = '" + weapon + "'"
            }
            console.log(myQuery)
            client.query(myQuery, function(err, result) {
                // console.log(result.rowCount)
                if(result.rowCount == 0) {
                  res.send(500);
                } 
                else {
                  var featureCollection = new FeatureCollection();
                  for(var i=0; i<result.rowCount; i++){
                    var feature = new Feature();
                    //feature.properties = ({"city_name":result.rows[i].city_name, "cntry_name":result.rows[i].cntry_name, "pop":result.rows[i].pop});
                    feature.properties = ({
                        "desc":result.rows[i].description, 
                        "date":result.rows[i].crimedate,
                        "crimetime":result.rows[i].crimetime,
                        "weapon":result.rows[i].weapon,
                    })
                    feature.geometry = JSON.parse(result.rows[i].geography);
                    featureCollection.features.push(feature);
                  }
                  res.type('text/javascript');
                  res.jsonp(featureCollection);
                  done();
                }
            });
        })

    }
    else{
        //send failuer
    }
}

exports.nearClick = function(req, res, next) {
    var swX = req.query.swX,
        swY = req.query.swY,
        neX = req.query.neX,
        neY = req.query.neY,
        startDate = req.query.startDate,
        endDate = req.query.endDate,
        weapon = req.query.weapon,
        numFeats = req.query.numFeat,
        nearLat = req.query.clicklat,
        nearLon = req.query.clicklng;

    //if the bounding box has three values come in on param...
    if(swX && swY && neX && neY && startDate && endDate){
        pg.connect(connstring, function(err, client, done) {
            var handleError = function(err) {
                if(!err) return false;
                done(client);
                next(err);
                return true;

            };
            if(numFeats == '0'){
                var myQuery = "SELECT *, ST_AsGeoJSON(geom) AS geography FROM homicides WHERE ST_CoveredBy(geom, ST_GeometryFromText ('POLYGON((" + swX + " " + swY + "," + neX + " " + swY + "," + neX + " " + neY + "," + swX + " " + neY + ","+ swX + " " + swY + "))', 4326 )) AND (crimedate >= to_date('" + startDate + "','YYYY-MM-DD') AND (crimedate <= to_date('" + endDate + "', 'YYY-MM-DD')))"
            }
            if((numFeats != '0') &&(nearLat != '0') && (nearLon != '0')){
                var myQuery = "SELECT *, ST_AsGeoJSON(geom) AS geography FROM homicides WHERE ST_CoveredBy(geom, ST_GeometryFromText ('POLYGON((" + swX + " " + swY + "," + neX + " " + swY + "," + neX + " " + neY + "," + swX + " " + neY + ","+ swX + " " + swY + "))', 4326 )) AND (crimedate >= to_date('" + startDate + "','YYYY-MM-DD') AND (crimedate <= to_date('" + endDate + "', 'YYY-MM-DD'))) AND ST_GeomFromText(" + nearLon + " " + nearLat + ",4326) <> geom ORDER BY ST_Distance(ST_GeomFromText(" + nearLon + " " + nearLat + ",4326),geom) LIMIT " + numFeats + ";"
            }
            if((weapon != 'ALL') && (weapon)){
                myQuery = myQuery + " AND weapon = '" + weapon + "'"
            }
            console.log(myQuery)
            client.query(myQuery, function(err, result) {
                // console.log(result.rowCount)
                if(result.rowCount == 0) {
                  res.send(500);
                } 
                else {
                  var featureCollection = new FeatureCollection();
                  for(var i=0; i<result.rowCount; i++){
                    var feature = new Feature();
                    //feature.properties = ({"city_name":result.rows[i].city_name, "cntry_name":result.rows[i].cntry_name, "pop":result.rows[i].pop});
                    feature.properties = ({
                        "desc":result.rows[i].description, 
                        "date":result.rows[i].crimedate,
                        "crimetime":result.rows[i].crimetime,
                        "weapon":result.rows[i].weapon,
                    })
                    feature.geometry = JSON.parse(result.rows[i].geography);
                    featureCollection.features.push(feature);
                  }
                  res.type('text/javascript');
                  res.jsonp(featureCollection);
                  done();
                }
            });
        })

    }
    else{
        //send failuer
    }
}


