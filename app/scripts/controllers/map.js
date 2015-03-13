'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:LangCtrl
 * @description
 * # LangCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
.controller('MapCtrl', [ '$scope', '$http', 'leafletData', function($scope, $http, leafletData) {
    $scope.dataPoints = [];

        leafletData.getMap().then(function(map) {
            L.mapbox.accessToken = 'pk.eyJ1IjoiLS1tYWx0ZWFocmVucyIsImEiOiJGU21QX2VVIn0.GVZ36UsnwYc_JfiQ61lz7Q';
            L.mapbox.featureLayer()
                .loadURL('PasingWlan.geojson')
                .addTo(map);
        });


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

    $scope.loadGeojson = function () {
       $http.get("PasingWlan.geojson").success(function(data, status) {
           var arr = new Array();
           angular.forEach(data.features, function(value, key) {
               var x = value.geometry.coordinates[0];
               var y = value.geometry.coordinates[1];
               var featArr = new Array(y, x, 1);
               arr.push(featArr);
           });

           $scope.dataPoints = arr;
           angular.extend($scope, {
               layers: {
                   overlays: {
                       heatmap: {
                           name: 'Heat Map',
                           type: 'heatmap',
                           data: $scope.dataPoints,
                           visible: true,
                           layerOptions: {
                               size: 100,
                               opacity: 0.5
                           }
                       }
                   }
               }
           });

       });


    };

    //Load geojson
    //$scope.loadGeojson();
}]);