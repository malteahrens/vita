'use strict';

/**
 * @ngdoc directive
 * @name angularApp.directive:mouseover
 * @description
 * If there is a value attached to the directive this will be the id for the mouseover action, otherwise it will try to read the id from the translation directive (if present)
 */

angular.module('cordova', [])

    .factory('deviceReady', function(){
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