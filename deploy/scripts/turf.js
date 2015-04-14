var turf = require('turf');
var fs = require('fs');

var randomPoints = fs.readFileSync('./app/data/geojson/PasingWlan_BestLatLon.geojson');
randomPoints = JSON.parse(randomPoints);

// Hexgrid
var bbox = [11.43,48.125,11.493,48.177];
var cellWidth = 0.1;
var units = 'kilometers';
var hexgrid = turf.hexGrid(bbox, cellWidth, units);

// Count
var counted = turf.count(hexgrid, randomPoints, 'pt_count');
var resultFeatures = hexgrid.features.concat(counted.features);
var result = {
    "type": "FeatureCollection",
    "features": resultFeatures
};

fs.writeFileSync('./app/data/geojson/PasinWlan_HexgridCount.geojson', JSON.stringify(result));
console.log('saved hexgrid.geojson');