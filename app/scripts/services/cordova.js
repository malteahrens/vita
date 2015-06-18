angular.module('cordova', [])

    .factory('deviceReady', function(){
        console.log("factory loaded")
        return function(done) {
            if (typeof window.cordova === 'object') {
                document.addEventListener('deviceready', function () {
                    done();
                }, false);
            } else {
                console.log("running in browser...")
                done();
            }
        };
    });