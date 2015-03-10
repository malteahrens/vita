var gdal = require("gdal");
// https://www.npmjs.com/package/ogr2ogr
var ogr2ogr = require('ogr2ogr');

console.dir(gdal.version);
var ogr = ogr2ogr('Stadtbezirk21.shp');

ogr.exec(function (er, data) {
    if (er) console.error(er)
    console.log(data)
})

