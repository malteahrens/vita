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
            $scope.fadeIn = true;
		},
        link: function ($scope, element, attrs) {
            element.bind('mouseenter', function ($event) {
				$scope.$apply(function() {
					$scope.imgSrc = attrs.mouseover;
				});
            });

            element.bind('mouseleave', function ($event) {
                $scope.$apply(function() {
                    $scope.fadeIn = false;
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
                ngSrc: '@',
                fadeIn: '@'
            },
            link: function(scope, element, attrs) {

                element.on('load', function() {
                    console.log("load");
                }).on('error', function() {
                    console.log("error loading image");
                });

                scope.$watch('ngSrc', function(newVal) {
                    console.clear();
                    console.log("change");
                    // trigger animation and wait until it is finshed... then reset
                    $animate.removeClass(element, 'fadein');
                        var promise = $animate.addClass(element, 'fadein');
                        console.log(element);
                        promise.then(function () {
                            // if we are in here, the animation is complete
                            console.log("animation finished");
                            console.log(element);
                            $animate.removeClass(element, 'fadein');
                            console.log(element);
                        });

                });
            }
        };

    });