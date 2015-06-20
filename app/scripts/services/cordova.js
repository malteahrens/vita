'use strict';

/**
 * @ngdoc directive
 * @name angularApp.directive:mouseover
 * @description
 * If there is a value attached to the directive this will be the id for the mouseover action, otherwise it will try to read the id from the translation directive (if present)
 */
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