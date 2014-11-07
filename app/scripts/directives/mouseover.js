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
        link: function ($scope, element, attrs) {
            element.bind('mouseover', function ($event) {
				$scope.$apply(function() {
					$scope.imgSrc = attrs.mouseover;
				});
            });
        }
    };
	
  });

angular.module('angularApp')
    .directive('fadeIn', function ($animate) {
        return {
            restrict: 'A',
            scope: {
                ngSrc: "@"
            },
            link: function(scope, element, attrs) {
                scope.$watch('ngSrc', function(newVal) {
                    // this demonstrates to manually kickstart an animation in
                    // AngularJS. After the animation finishes it removes the
                    // trigger CSS to prepare to animate again
                    var promise = $animate.addClass(element, 'fadein');
                    promise.then(function () {
                        $animate.removeClass(element, 'fadein');
                        scope.$apply();
                    });
                });
            }
        };

    });