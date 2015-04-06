var gdal = require("gdal");
// https://www.npmjs.com/package/ogr2ogr
var ogr2ogr = require('ogr2ogr');

var filename = "Stadtbezirk21.shp";
var ds = gdal.open();
var driver = ds.driver;
var driver_metadata = driver.getMetadata();
if (driver_metadata['DCAP_VECTOR'] !== 'YES') {
    console.error('Source file is not a vector');
    process.exit(1);
}
console.log('Driver = ' + driver.description);
console.log('');
// layers
var i = 0;
console.log('Layers: ');
ds.layers.forEach(function(layer){
    console.log((i++)+': '+ layer.name);
    console.log(' Geometry Type = '+gdal.Geometry.getName(layer.geomType));
    console.log(' Spatial Reference = '+(layer.srs ? layer.srs.toWKT() : 'null'));
    var extent = layer.getExtent();
    console.log(' Extent: ');
    console.log(' minX = '+extent.minX);
    console.log(' minY = '+extent.minY);
    console.log(' maxX = '+extent.maxX);
    console.log(' maxY = '+extent.maxY);
    console.log(' Fields: ')
    layer.fields.forEach(function(field){
        console.log(' -'+field.name+' ('+field.type+')');
    });
    console.log(' Feature Count = '+layer.features.count());
});