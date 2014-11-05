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
        link: function (scope, iElement, attrs) {		
            iElement.bind('mouseover', function ($event) {
				var attribute = attrs.mouseover;
				
				if(attribute == "" && $event.target.attributes['translate'] != undefined) {
					// there was no value set for mouseover attr - try to get an id from translation directive
					console.log("try to set from translate directive");
					attribute = $event.target.attributes['translate'].value;
					console.log(attribute);
				}
				
				var source = "images/"+attribute+".png";
				console.log("set image source to "+ source);
				scope.imgSrc = source;
				scope.$apply();
            });
        }
    };
  });
