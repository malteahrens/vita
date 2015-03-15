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
    $scope.map = {};

        mapboxgl.accessToken = 'pk.eyJ1IjoiLS1tYWx0ZWFocmVucyIsImEiOiJGU21QX2VVIn0.GVZ36UsnwYc_JfiQ61lz7Q';

        var map = new mapboxgl.Map({
            container: 'map',
            zoom: 12.5,
            center: [48.14882451158226, 11.451873779296875],
            style: 'https://www.mapbox.com/mapbox-gl-styles/styles/bright-v7.json',
            hash: true
        });

        map.addControl(new mapboxgl.Navigation());

        map.on('style.load', function() {
            map.addSource("markers", {
                "type": "geojson",
                "maxzoom": 14,
                "data": "/PasingWlan.geojson"
            });

            map.addLayer({
                "id": "markers",
                "type": "symbol",
                "source": "markers",
                "layout": {
                    "icon-image": "harbor-12",
                }
            });
        });
}]);