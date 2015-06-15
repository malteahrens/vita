'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('MainCtrl', function ($scope) {
	$scope.imgSrc = "images/yeoman.png";

    $scope.mouseOverThing = function(event) {
        //console.log(event);
    }
  });
