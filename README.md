[ ![Codeship Status for Geomore/GISAPI_Workshop_06192014](https://www.codeship.io/projects/2115e9f0-f072-0131-1924-5699c2e7bb50/status)](https://www.codeship.io/projects/27397)

Nodejs, Postgres with PostGIS geojson api workshop

This little workshop will get you off the ground and running.  After this, you will be able to deploy your own Geo-services API to a cloud provider, and adjust the data that is being served.

## Pre-Requisites
- You need to have a development computer with admin/root access. You will need to install:
1.  Nodejs 0.10.x (preferable the latest, 0.10.29)
2.  Various node modules including Express, PG, and forever.
3.  An SSH tool
4.  You probably will want QGIS
5.  PGAdmin (postgres administration utility)

##Install

###Mac - Install nodejs.  To do so, install instructions here: http://nodejs.org/

###Linux - follow the instructions here:  https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager

##Windows - Good luck - it looks like you need visual studio installed.  I have tried to install visual studio express 2014 AND .net sdk 2.0 without any luck.  Trying : http://www.microsoft.com/en-us/download/details.aspx?id=29  You will also need an SSH client (i suggest putty)


//Open Data Used:
Neighborhoods - https://data.baltimorecity.gov/Neighborhoods/Neighborhoods-Shape/ysi8-7icr

#todo
templating for front end
overall cleanup
make sql updates responsive
appearance updates
more queries
add a better landing page with install/config instructions, data instructions, contact, etc