var fs = require("fs");
var sqlite3 = require('sqlite3').verbose();
// https://www.npmjs.com/package/ogr2ogr
var ogr2ogr = require('ogr2ogr');
var turf = require('turf');

// output path is different when run locally
var outputPath = './dist/data/geojson/';
if(process.env.TRAVIS) {
    console.log("running on Travis...");
} else {
    console.log("running locally...");
    outputPath = './app/data/geojson/';
}

console.log("Convert sqlite database to geojson file with ogr2ogr and VRT");

//var ogr = ogr2ogr('./app/data/PasingWlan.vrt').timeout(100000);
//ogr.exec(function (er, data) {
//    if (er) console.error(er)
//    console.log(data.size)
//})

//ogr.pipe(fs.createWriteStream(outputPath+'/PasingWlan.geojson'));

ogr = ogr2ogr('./app/data/PasingWlan_Sqlite.vrt').timeout(100000);
ogr.exec(function (er, data) {
    if (er) console.error(er)
    var random = 0;
    for(var i=0; i<data.features.length; i++) {
        var feature = data.features[i];
        random = (Math.random() * (-0.000150 - 0.000150) + 0.000150);
        data.features[i].geometry.coordinates[0] += random;
        random = (Math.random() * (-0.000150 - 0.000150) + 0.000150);
        data.features[i].geometry.coordinates[1] += random;
    }
    fs.writeFileSync(outputPath+'PasingWlan_Sqlite.geojson', JSON.stringify(data));
})
