var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('/app/data/wigle/PasingWlan.sqlite');

db.serialize(function() {
    db.get("SELECT * FROM location", function(err, row) {
        console.log(row);
    });
});

db.close();