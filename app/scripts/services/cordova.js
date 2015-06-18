angular.module('cordova', [])

    .factory('deviceReady', function(){
        console.log("factory loaded");
        return function(done) {
            console.log("inside factory");
            if (typeof window.cordova === 'object') {
                alert("running inside phonegap");
                document.addEventListener('deviceready', function () {
                    done();
                }, false);
            } else {
                alert("running in browser...")
                done();
            }
        };
    });