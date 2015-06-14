angular.module('angularApp.services.Cordova', [])
    .factory('deviceReady', function(){
        return function(done) {
            if (typeof window.cordova === 'object') {
                document.addEventListener('deviceready', function () {
                    alert("device ready");
                    done();
                }, false);
            } else {
                done();
            }
        };
    });
