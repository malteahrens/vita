// https://github.com/mapnik/node-mapnik
// https://github.com/mapnik/node-mapnik/blob/6066a0056d773835e083492f2e356639ef4fcf0f/test/vector-tile.test.js

var mapnik = require('mapnik');
mapnik.register_datasource(path.join(mapnik.settings.paths.input_plugins,'geojson.input');

var vtile = new mapnik.VectorTile(0,0,0);
var geojson = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -122,
                    48
                ]
            },
            "properties": {
                "name": "geojson data"
            }
        }
    ]
};
vtile.addGeoJSON(JSON.stringify(geojson),"layer-name");
var out = JSON.parse(vtile.toGeoJSON(0));
var coords = out.features[0].geometry.coordinates;
vtile.toGeoJSON(0,function(err,json_string) {
    var out2 = JSON.parse(json_string);
    var coords = out2.features[0].geometry.coordinates;
    done();
});


console.log("This script generates vector tiles from a GeoJSON file using node-mapnik")