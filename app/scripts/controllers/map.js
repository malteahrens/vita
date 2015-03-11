'use strict';

//L.Icon.Default.imagePath='typo3conf/ext/ods_osm/res/leaflet/images';
L.GeoJSON = L.GeoJSON.extend({
    addTo: function(map) {
        var self = this;
        map.addLayer(this.markers);
        var parentRemove = L.GeoJSON.prototype.onRemove;
        L.GeoJSON.prototype.onRemove = function (map) {
            self.markers.removeLayer(self);
            delete self.markers;
            parentRemove(map);
        };
        return this;
    }
});
L.geoJson = function (geojson, options) {
    var geoJSON = new L.GeoJSON(geojson, options);
    var markers = new L.MarkerClusterGroup({
        spiderfyOnMaxZoom: false,
        showCoverageOnHover: true,
        zoomToBoundsOnClick: true,
        disableClusteringAtZoom: 18
    });
    markers.setGeoJSON = function(data) {
        geoJSON.setGeoJSON(data);
    };
    markers.addLayer(geoJSON);
    geoJSON.markers = markers;
    return  markers;
};

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
           $http.get("PasingWlan.geojson").success(function(data, status) {
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