/*
homicides data creation creates and inserts scripts
*/

/* first, create an empty table. this is set up with the schema from the homicides dataset downloaded from openBaltimore's terrible portal.  Note - you could use column type GEOMETRY(POINT,4326) for the coords column, except in lieu of pre-processing to get the coordinates in the right order we will just have a few more sql steps*/
CREATE TABLE homicides
(	crimeDate date,
	crimeTime varchar(4),
	crimeCode varchar(3),
	location varchar,
	description varchar,
	weapon varchar,
	post varchar,
	district varchar,
	neighborhood varchar,
	coords varchar,
	total_incidents integer
);

/*
Now copy the data from the csv in to your table, here is mine, adjust the copy statement to point to where you downloaded the csv to.
*/
COPY homicides FROM '/Users/chogan/Sites/GISAPI_Workshop_06192014/data_/fromOpenBalt/Homicides.csv' DELIMITER ',' CSV HEADER

/* Now add a geography field */
ALTER TABLE homicides ADD COLUMN geog geography(POINT, 4326);

/* And update the column */
UPDATE homicides SET geog = ST_GeographyFromText('SRID=4326;POINT('
	|| (string_to_array(regexp_replace(coords, '[()]', '','g'), ', '))[2] || ' '
	|| (string_to_array(regexp_replace(coords, '[()]', '','g'), ', '))[1] || ')');
