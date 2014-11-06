'use strict';

/**
 * @ngdoc directive
 * @name angularApp.directive:mouseover
 * @description
 * If there is a value attached to the directive this will be the id for the mouseover action, otherwise it will try to read the id from the translation directive (if present)
 */
angular.module('angularApp')
  .directive('mouseover', function () {
    return {
		restrict: 'EA',
		controller: function ($scope) {
			$scope.imgSrc = "images/yeoman.png";
			$scope.hideSwitch = false;
		},
        link: function ($scope, element, attrs) {
            element.bind('mouseover', function ($event) {
				$scope.$apply(function() {
					$scope.hideSwitch = true;
					// start animation to make the image visible...
					//$scope.imgSrc = attrs.mouseover;
				});
            });
        }
    };
	
  });