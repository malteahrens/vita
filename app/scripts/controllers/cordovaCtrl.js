'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:cordovaCtrol
 * @description
 * # CordovaCtrl
 * Controller to extent functionality when running in cordova
 */
angular.module('angularApp')
    .controller('CordovaCtrl', function ($scope, $cordovaDevice) {
        console.log("controller loaded...");
        console.log("device");
        var device = $cordovaDevice.getDevice();
        console.log(device);
    });