var fs = require("fs");
var sqlite3 = require('sqlite3').verbose();

var file = "./app/data/PasingWlan.sqlite";
var exists = fs.existsSync(file);
var geojson = new Array();

if(exists) {
    var db = new sqlite3.Database(file);
        db.each("SELECT * FROM location", function(err, row) {
            geojson.push(row);
        }, function(err, row) {
            for(var i=0; i<geojson.length; i++) {
                if(geojson[i]._id == 59182) {
                    console.log("hit");
                }
            }
        });

    db.close();
} else {
    console.log("database not found...");
}