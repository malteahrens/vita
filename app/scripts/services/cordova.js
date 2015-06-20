"use strict";
var cordovaModule = angular.module('cordova', []);
cordovaModule.factory('deviceReady', function(){
    console.log("factory loaded");
    return function(done) {
        console.log("inside factory");
        var app = document.URL.indexOf( 'http://' ) === -1 && document.URL.indexOf( 'https://' ) === -1;
        if ( app ) {
           //alert("running inside phonegap");
            done();
        } else {
            // alert("running in browser...")
            done();
        }
    };
});