var fs = require("fs");
var sqlite3 = require('sqlite3').verbose();
// https://www.npmjs.com/package/ogr2ogr
var ogr2ogr = require('ogr2ogr');

var file = "./app/data/PasingWlan.sqlite";
var exists = fs.existsSync(file);
var geojson = new Array();
var outputPath = './dist/data/geojson/';
if(process.env.TRAVIS === true) {
    console.log("running on Travis...");
} else {
    outputPath = './app/data/geojson/';
}

console.log("generates different geojson files from wigle wifi sqlite database. An alternative way to do this is to use gdal and vrt file format encapsulating the sqlite database");

var ogr = ogr2ogr('./app/data/PasingWlan.vrt').timeout(50000).stream();
ogr.pipe(fs.createWriteStream('./app/data/geojson/PasingWlan.geojson'));

if(exists) {
    var db = new sqlite3.Database(file);
    db.each("SELECT * FROM location, network WHERE location.bssid = network.bssid", function(err, row) {
        geojson.push(row);
    }, function(err, row) {
        // wait until reading from db is finished...
        if(!err) {
            for(var i=0; i<geojson.length; i++) {
                // test if the bssid is already available
                var testHit = hit[geojson[i].bssid];
                if(typeof testHit === 'undefined') {
                    initGeojsonArray(geojson[i]);
                }
                addFeature(geojson[i]);
            }
            var resGeojson = fillFeatures('Point');
            //console.log(resultPointGeojson);
            var outputFile = "PasingWlan_Centroid.geojson";
            writeGeojsonToFile(resGeojson, outputFile);

            resGeojson = fillFeatures('LineString');
            outputFile = "PasingWlan_DifVector.geojson";
            writeGeojsonToFile(resGeojson, outputFile);

            // write geojson for values bestlon / bestlat
            resGeojson = fillFeatures('Point');
            outputFile = "PasingWlan_BestLatLon.geojson";
            //console.log(resGeojson.OGRGeoJSON.features.length);
            // replace lat/lon (weighted centroid)
            for (var i=0;i<resGeojson.features.length; i++) {
                resGeojson.features[i].geometry.coordinates[0] = resGeojson.features[i].properties.bestlon;
                resGeojson.features[i].geometry.coordinates[1] = resGeojson.features[i].properties.bestlat;
            }
            writeGeojsonToFile(resGeojson, outputFile);
        } else {
            console.log("There was an error: "+err);
        }

    });

    db.close();
} else {
    console.log("database not found...");
}

var weightedCentroid = function(features, featureType) {
    var lat = 0.0;
    var lon = 0.0;
    var lev = 0;
    //console.log("Level: "+features[j].properties.level+
    //    ", Coordinates: "+features[j].geometry.coordinates);

    // Vertices:    v1, v2, ... , vn
    // Masses:      m1, m2, ... , mn
    // Coordinates: v1x, v1y, v2x, v2y,  ... , vnx, vny
    // Center of mass: cx, cy
    // cx = (v1x*m1 + v2x*m2 + ... + vnx*mn) / (m1 + m2 + ... + mn)
    // cy = (v1y*m1 + v2y*m2 + ... + vny*mn) / (m1 + m2 + ... + mn)

    // all different coordinates of an AP are stored in a FeatureCollection
    // of point features. Get the weighted centroid of all given points in the
    // collection.
    for(var j=0; j<features.length; j++) {
        //console.log("Level: "+features[j].properties.level+
        //    ", Coordinates: "+
        // features[j].geometry.coordinates);
        if (isFinite(features[j].geometry.coordinates[0])) {
            lon += features[j].geometry.coordinates[0] * features[j].properties.level;
            lat += features[j].geometry.coordinates[1] * features[j].properties.level;
            lev += features[j].properties.level;
        } else {
            //console.log("detected infinite number, this is most likely beacause of the datasource");
        }

        if(features[0].properties.bssid == 'c0:25:06:6f:f5:73'){
            //console.log("lon1: "+lon);
            //console.log("lat1: "+lat);
        }

        if(j==features.length-1) {
            // calculate centroid

            //console.log(lev);
            var lonTri = features[j].geometry.coordinates[0];
            var latTri = features[j].geometry.coordinates[1];
            //console.log(features[0]);
            if(features[0].properties.bssid == 'c0:25:06:6f:f5:73'){
                //console.log("lat: "+lat);
                //console.log("lon: "+lon);
                //console.log("latTri: "+latTri);
                //console.log("lonTri: "+lonTri);
                //console.log("lev: "+lev);
            }

            try {
                lonTri = lon/lev;
                latTri = lat/lev;
            } catch(exception) {
                console.log("division with 0 - error: "+exception);
            }

            if(features[0].properties.bssid == 'c0:25:06:6f:f5:73'){
                //console.log(lonTri);
                //console.log(latTri);
            }

            // check if bestlat is available
            var bestlat = latTri;
            var bestlon = lonTri;
            if(isFinite(features[0].properties.bestlat)) {
                bestlat = features[0].properties.bestlat;
                bestlon = features[0].properties.bestlon;
            } else {
                //console.log("detected infinite number, this is most likely beacause of the datasource");
            }

            //console.log(lonTri);
            var gjFeature = {
                "type": "Feature",
                "properties": {
                    "x": latTri,
                    "y": lonTri,
                    "bestlat": bestlat,
                    "bestlon": bestlon,
                    "distanceMeters": measureDistance(bestlat, bestlon, lonTri, latTri),
                    "ssid": features[0].properties.ssid,
                    "bssid": features[0].properties.bssid
                }, "geometry": {
                    "type": featureType,
                    "coordinates": [ latTri, lonTri ]
                }
            }

            if(featureType === 'LineString') {
                gjFeature.geometry.coordinates = [[ latTri, lonTri ], [bestlon, bestlat]]
            }

            return gjFeature;
        }
    }
};

var measureDistance = function (lat1, lon1, lat2, lon2){  // generally used geo measurement function
    var R = 6378.137; // Radius of earth in KM
    var dLat = (lat2 - lat1) * Math.PI / 180;
    var dLon = (lon2 - lon1) * Math.PI / 180;
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon/2) * Math.sin(dLon/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;
    return d * 1000; // meters
}

var writeGeojsonToFile = function(geojson, outputFileName) {
    console.log("GeoJson saved to file: "+outputFileName);
    var ogr = ogr2ogr(geojson).options(['-clipdst', './app/data/geojson/Pasing.geojson']).timeout(30000).stream();
    ogr.pipe(fs.createWriteStream(outputPath+outputFileName));
    /**
     * fs.writeFile(outputFile, JSON.stringify(geojson, null, 4), function(err) {
     *  if(err) {
     *      console.log(err);
     *  } else {
     *      console.log("GeoJson saved to file: "+outputFile);
     *  }
     * });
     **/
};

var hit = new Array();
var initGeojsonArray = function(geojson) {
    hit[geojson.bssid] = {
        "type": "FeatureCollection",
        "features": []
    }
}

var addFeature = function(geojson) {
    if(geojson._id === 1) {
        //console.log(geojson);
    };
    // convert row from wigle wifi sqlite db to geojson feature
    hit[geojson.bssid].features.push({
        "type": "Feature",
        "properties": {
            "ssid": geojson.ssid,
            "bssid": geojson.bssid,
            "level": geojson.level,
            "bestlevel": geojson.bestlevel,
            "bestlat": geojson.bestlat,
            "bestlon": geojson.bestlon,
            "capabilities": geojson.capabilities,
            "type": geojson.type,
            "accuracy": geojson.accuracy,
        },
        "geometry": {
            "type": "Point",
            "coordinates": [geojson.lat, geojson.lon]
        }
    });
}

var fillFeatures = function(featureType) {
    var resultGeojson = {
        "type": "FeatureCollection",
        "features": []
    }
    var count = 0;
    for (key in hit) {
        var features = hit[key].features;
        //console.log();
        //console.log("--- "+features[0].properties.bssid+", with "+features.length+" observations ---");
        // returns geojson feature, weighted-centroid triangulation
        var centroidResult = weightedCentroid(features, featureType);
        // adds the feature to a feature collection
        resultGeojson.features.push(centroidResult);
        if(count===0) {
            //console.log(centroidResult);
        };
        count++;
    }

    return resultGeojson;
}