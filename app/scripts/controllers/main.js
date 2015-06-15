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

	$scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.things = [
        {item: 'one'},
        {item: 'two'},
        {item: 'three'}];

    $scope.mouseOverThing = function(event) {
        //console.log(event);
    }
  });
