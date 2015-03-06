'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:LangCtrl
 * @description
 * # LangCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
.controller('MapCtrl', [ '$scope', function($scope) {
    angular.extend($scope, {
        center: {
            lat: 48.14882451158226,
            lng: 11.451873779296875,
            zoom: 13
        },
        defaults: {
            tileLayer: "http://c.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg",
            maxZoom: 14,
            map: {
                fullscreenControl:true
            }
        }
    });
}]);