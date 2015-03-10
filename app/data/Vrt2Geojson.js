var gdal = require("gdal");
// https://www.npmjs.com/package/ogr2ogr
var ogr2ogr = require('ogr2ogr');

console.dir(gdal.version)

var dataset = gdal.open("PasingWlan.vrt");
var layer = dataset.layers.get(0);

console.log("number of features: " + layer.features.count());
console.log("fields: " + layer.fields.getNames());
console.log("extent: " + JSON.stringify(layer.extent));
console.log("srs: " + (layer.srs ? layer.srs.toWKT() : 'null'));