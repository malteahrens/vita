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
		},
        link: function ($scope, element, attrs) {
            element.bind('mouseover', function ($event) {
				$scope.$apply(function() {
					$scope.imgSrc = attrs.mouseover;
				});
            });
        }
    };
  });
