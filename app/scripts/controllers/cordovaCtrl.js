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
        var device = $cordovaDevice.getDevice();
        alert(device);
    });