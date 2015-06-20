"use strict";

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
            element.bind('mouseenter', function ($event) {
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

                element.on('load', function() {


                }).on('error', function() {
                    console.log("error loading image");
                });

                scope.$watch('ngSrc', function(newVal) {
                    //console.clear();
                    //console.log("change");
                    var promise;

                    if(promise != undefined) {
                        $animate.cancel(promise);
                        $animate.removeClass(element, 'fadein');
                        //console.log("animation canceld");
                    }

                    promise = $animate.addClass(element, 'fadein');
                    //console.log("animation started");
                    promise.then(function () {
                        // if we are in here, the animation is complete
                        //console.log("animation finished");
                        //console.log("before remove class");
                        //console.log(element);
                        $animate.removeClass(element, 'fadein');
                        //console.log("AFTER remove class and BEFORE apply");
                        //console.log(element);
                        scope.$apply();
                        //console.log("AFTER remove class and AFTER apply");
                        //console.log(element);
                    });
                });
            }
        };

    });