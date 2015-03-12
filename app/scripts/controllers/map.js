'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:LangCtrl
 * @description
 * # LangCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
.controller('MapCtrl', [ '$scope', '$http', function($scope, $http) {
    $scope.dataPoints = [];

        angular.extend($scope, {
            center: {
                lat: 48.14882451158226,
                lng: 11.451873779296875,
                zoom: 13
            },
            layers: {
                baselayers: {
                    osm: {
                        name: 'OpenStreetMap',
                        url: 'http://c.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg',
                        type: 'xyz'
                    }
                }
            }
        });

}]);