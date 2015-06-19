angular.module('cordova', [])

    .factory('deviceReady', function(){
        console.log("factory loaded");
        return function(done) {
            console.log("inside factory");
            var app = document.URL.indexOf( 'http://' ) === -1 && document.URL.indexOf( 'https://' ) === -1;
            if ( app ) {
               alert("running inside phonegap");
            } else {
                alert("running in browser...")
                done();
            }
        };
    });