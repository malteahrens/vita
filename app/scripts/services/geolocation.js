"use strict";
var geolocationModule = angular.module('geolocation', ['cordova']);
geolocationModule.factory('getCurrentPosition', function(deviceReady, $document, $window, $rootScope){
        console.log("device ready...");
        return function(done) {
            console.log("function call");
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