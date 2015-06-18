angular.module('cordova', [])

    .factory('deviceReady', function(){
        console.log("factory loaded");
        return function(done) {
            console.log("inside factory");
            if (window.phonegap || window.PhoneGap) {
                document.addEventListener('deviceready', function () {
                    alert("running inside phonegap");
                    done();
                }, false);
            } else {
                alert("running in browser...")
                done();
            }
        };
    });