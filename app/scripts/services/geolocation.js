'use strict';

/**
 * @ngdoc directive
 * @name angularApp.directive:mouseover
 * @description
 * If there is a value attached to the directive this will be the id for the mouseover action, otherwise it will try to read the id from the translation directive (if present)
 */

angular.module('geolocation', [
    'cordova'
])
    .factory('getCurrentPosition', function(deviceReady, $document, $window, $rootScope){
        return function(done) {
            deviceReady(function(){
                navigator.geolocation.getCurrentPosition(function(position){
                    $rootScope.$apply(function(){
                        done(position);
                    });
                }, function(error){
                    $rootScope.$apply(function(){
                        throw new Error('Unable to retreive position');
                    });
                });
            });
        };
    });