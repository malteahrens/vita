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
        $scope.loadGeojson = function () {
           $http.get("data/WlanPoints.geojson").success(function(data, status) {
               // Put the countries on an associative array
               angular.extend($scope, {
                   geojson: {
                       data: data
                   }
               });
           });


        };

        //Load geojson
        $scope.loadGeojson();

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
            },
            layers: {
                overlays: {
                    "geojson": {
                        "name": "Real world data",
                        "type": "markercluster",
                        "visible": true,
                        "layerOptions": {
                            "chunkedLoading": true,
                            "showCoverageOnHover": false,
                            "removeOutsideVisibleBounds": true
                        },
                        "layerParams": {}
                    }

                }
            }
        }
    });


}]);