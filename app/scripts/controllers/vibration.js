'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the angularApp
 */

angular.module('angularApp')
.controller('VibrationsCtrl', ['$scope', 'vibrator', function($scope, vibrator){
    $scope.vibrate = function(duration) {
        vibrator.vibrate(duration);
    };
    //setInterval($scope.vibrate, 5000)
}]);