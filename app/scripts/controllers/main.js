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

    $scope.partials = {
        para1: 'views/partials/para1.html',
        para2: 'views/partials/para2.html',
        para3: 'views/partials/para3.html',
        para4: 'views/partials/para4.html',
        para5: 'views/partials/para5.html'
    }

	$scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
