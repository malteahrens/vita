angular.module('cordova', [])

    .factory('deviceReady', function(){
        console.log("factory loaded");
        return function(done) {
            console.log("inside factory");
            if (typeof window.phonegap === 'object' || typeof window.PhoneGap === 'object') {
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