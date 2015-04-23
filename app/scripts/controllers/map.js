angular.module('angularApp')
.controller('MapCtrl', [ '$scope', '$http', function($scope, $http) {
    $scope.dataPoints = [];
    $scope.map = {};
    $scope.username = 'Press a button...';
    $scope.grid = function() {
        $scope.username = "should load grid layer";
    }

    mapboxgl.accessToken = 'pk.eyJ1IjoiLS1tYWx0ZWFocmVucyIsImEiOiJGU21QX2VVIn0.GVZ36UsnwYc_JfiQ61lz7Q';
    var map = new mapboxgl.Map({
        container: 'map',
        zoom: 12.5,
        center: [48.14882451158226, 11.451873779296875],
        style: 'https://www.mapbox.com/mapbox-gl-styles/styles/bright-v7.json',
        minZoom: 9,
        maxZoom: 20,
        hash: true,
        interactive: true
    });
    map.addControl(new mapboxgl.Navigation());
    //map.setPitch(60);
    //map.collisionDebug = true;

    // load default layers
    map.on('load', function(e) {
        console.log("map loaded...");
        // lindex is the style index
        $scope.addGeojsonLayer({'name':'Pasing'});
        $scope.addGeojsonLayer({'name':'locationAccuracy'});
        $scope.addGeojsonLayer({'name':'locationHeading'});
        $scope.addGeojsonLayer({'name':'location'});
    });

    $scope.setPointData = function(layerId, data) {
        var layer = map.getSource(layerId);
        if(layer !== undefined) {
            var locationPoint = {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": data
                }
            }
            layer.setData(locationPoint);
        } else {
            console.log("Couldn't update data: layer not found");
        }
    };
    $scope.setBufferData = function(layerId, data, radius) {
        var layer = map.getSource(layerId);
        if(layer !== undefined) {
            var point = turf.point(data);
            var buffered = turf.buffer(point, radius, 'kilometers')
            layer.setData(buffered);
        } else {
            console.log("Couldn't update data: layer not found");
        }
    };
    $scope.setLineData = function(layerId, data) {
        var layer = map.getSource(layerId);
        if(layer !== undefined) {
            layer.setData(data);
        } else {
            console.log("Couldn't update data: layer not found");
        }
    };

    $scope.layerList = [];
    $scope.toggleLayer = function(layerId) {
        console.log("toggle layer: "+layerId);
        var layerVisibility = map.getLayoutProperty(layerId, 'visibility');
        var newLayerVisibility = 'none';
        if(layerVisibility === 'none') {
            newLayerVisibility = 'visible';
        }
        map.setLayoutProperty(layerId, 'visibility', newLayerVisibility)
    }
    $scope.addGeojsonLayer = function(layer, visibility) {
        if(visibility === undefined){
            visibility = true;
        }
        var symbolTemplate = {}
        var lineTemplate = {
            "type": 'line',
            "layout": {
                "visibility": visibility
            },
            "paint": {
                "line-color": "#ff0000",
                "line-width": 2
            }
        }
        var fillTemplate = {}

        var style = {
            "Pasing": {
                "type": 'line',
                "layout": {
                    "visibility": visibility
                },
                "paint": {
                    "line-color": "#ff0000",
                    "line-width": 2
                }
            },
            "PasingWlan_BestLatLon": {
                "type": 'symbol',
                "layout": {
                    "icon-image": "circle-12",
                    "icon-allow-overlap": true,
                    "icon-color": "#669966",
                    "text-field": "{bssid}",
                    "text-font": "Open Sans Semibold, Arial Unicode MS Bold",
                    "text-anchor": "bottom-left",
                    "icon-ignore-placement": true,
                    "icon-padding": 0,
                    "text-padding": 0,
                    "text-optional": true,
                    "text-allow-overlap": false,
                    "text-ignore-placement": false,
                    "visibility": visibility
                },
                "paint": {
                    "icon-size": 0.5,
                    "text-size": 10,
                    "text-halo-color": "#ffffff",
                    "text-translate": [4, 2],
                    "text-halo-width": 1
                }
            },
            "PasingWlan_Sqlite": {
                "type": 'symbol',
                "layout": {
                    "icon-image": "{maki}-12",
                    "icon-allow-overlap": true,
                    "icon-color": "#669966",
                    "text-field": "{ssid}",
                    "text-font": "Open Sans Semibold, Arial Unicode MS Bold",
                    "text-anchor": "bottom-left",
                    "icon-ignore-placement": true,
                    "icon-padding": 0,
                    "text-padding": 0,
                    "text-optional": true,
                    "text-allow-overlap": false,
                    "text-ignore-placement": false,
                    "visibility": visibility
                },
                "paint": {
                    "icon-size": 0.5,
                    "text-size": 10,
                    "text-halo-color": "#ffffff",
                    "text-translate": [4, 2],
                    "text-halo-width": 1
                }
            },
            "PasingWlan_Centroid": {
                "type": 'symbol',
                "layout": {
                    "icon-image": "circle-12",
                    "icon-allow-overlap": true,
                    "icon-color": "#669966",
                    "text-field": "{ssid}",
                    "text-font": "Open Sans Semibold, Arial Unicode MS Bold",
                    "text-anchor": "bottom-left",
                    "text-optional": true,
                    "text-allow-overlap": true,
                    "text-ignore-placement": true,
                    "alwaysVisible": true,
                    "visibility": visibility
                },
                "paint": {
                    "icon-size": 0.5,
                    "icon-color": '#669966',
                    "line-color": "#ff0000",
                    "line-width": 2,
                    "text-size": 10,
                    "text-halo-color": "#ffffff",
                    "text-translate": [4, 2],
                    "text-halo-width": 4
                }
            },
            "location": {
                "type": 'symbol',
                "layout": {
                    "icon-image": "circle-12"
                },
                "paint": {
                    "icon-size": 1,
                    "icon-color": "#669966"
                }
            },
            "locationAccuracy": {
                "type": 'fill',
                "layout": {
                    "visibility": visibility
                },
                "paint": {
                    "fill-outline-color": "#ff0000",
                    "fill-color": "#ff0000",
                    "fill-opacity": 0.2
                }
            },
            "locationHeading": {
                "type": 'line',
                "layout": {
                    "visibility": visibility
                },
                "paint": {
                    "line-color": "#ff0000",
                    "line-width": 2
                }
            }
        }

        var data = "";
        if(layer.name !== "location" && layer.name !== "locationAccuracy") {
            data = "http://malteahrens.de/data/geojson/"+layer.name+".geojson"
        } else {
            data = [0, 0]
        }
        map.addSource(layer.name, {
            "type": "geojson",
            "data": data
        });

        map.addLayer({
            "id": layer.name,
            "type": style[layer.name].type,
            "source": layer.name,
            "interactive": true,
            "layout": style[layer.name].layout,
            "paint": style[layer.name].paint
        });
        $scope.layerList.push(layer.name);
        $scope.$apply();
    }

    var textAllowOverlap = false;
    var textIgnorePlacement = false
    var prevZoom = map.transform.zoom;
    map.on('zoom', function () {
        //console.log("zoomed: "+map.transform.zoom);
        var layer = map.getSource('PasingWlan_Sqlite');
        if(layer !== undefined) {
            if (map.transform.zoom > 18.5 && prevZoom < 18.5) {
                console.log("show labels");
                map.setLayoutProperty('PasingWlan_Sqlite', 'text-allow-overlap', true);
            } else if(map.transform.zoom < 18.5 && prevZoom > 18.5) {
                console.log("hide labels");
                map.setLayoutProperty('PasingWlan_Sqlite', 'text-allow-overlap', false);
            }
            prevZoom = map.transform.zoom;

            //map.setLayoutProperty('PasingWlan_Sqlite', 'text-ignore-placement', textIgnorePlacement);
            //console.log(visibility);
            //map.setFilter('PasingWlan_BestLatLon', ["!=", 'ssid', 'Waldrebe']);
        } else {
            console.log('could not find layer');
        }
    });

    $scope.trackLocation = false;
    $scope.speed = 0;
    $scope.heading = 0;
    $scope.accuracy = 0;
    var intervalId = 0;
    $scope.toggleTrackLocation = function() {
        //console.log("was: "+$scope.trackLocation);
        $scope.trackLocation = !$scope.trackLocation;
        //console.log("now: "+$scope.trackLocation);

        // enable disable track location
        if($scope.trackLocation) {
            intervalId=self.setInterval(getLocation, 2000);
        } else {
            clearInterval(intervalId);
        }

        function getLocation() {
            var options = {timeout:60000};
            if (navigator && navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(successCallback, errorCallback, options);
            } else {
                console.log('Geolocation is not supported');
            }
        }

        function errorCallback(err) {
            if(err.code == 1) {
                alert("Error: Access is denied!");
            }else if( err.code == 2) {
                alert("Error: Position is unavailable!");
            }
        }

        function successCallback(position) {
            var location1 = [position.coords.latitude, position.coords.longitude];
            var location2 = [position.coords.longitude, position.coords.latitude];

            if(!isNaN(position.coords.heading)) {
                console.log("heading: "+position.coords.heading);

                try {
                    var headingDirection = position.coords.heading;
                    if(headingDirection > 180) {
                        headingDirection = (headingDirection - 180) * -1
                    }
                    var currentPoint = turf.point(location2);
                    var headingTarget = turf.destination(currentPoint, 0.1, headingDirection, "kilometers");
                    var headingDirectionLine = turf.linestring([location2, headingTarget]);
                    $scope.setLineData("locationHeading", headingDirectionLine);
                    $scope.heading = headingDirection;
                } catch(err) {
                    document.getElementById("features").innerHTML = err.message;
                }
            }
            if(!isNaN(position.coords.speed)) {
                $scope.speed = position.coords.speed;
            }
            if(!isNaN(position.coords.accuracy)) {
                $scope.accuracy = position.coords.accuracy;
                try {
                    var radius = position.coords.accuracy * 0.01
                    $scope.setBufferData("locationAccuracy", location2, radius);
                } catch(err) {
                    document.getElementById("features").innerHTML = err.message;
                }
            }

            //$scope.setPointData("location", location2)
            $scope.$apply()
            map.easeTo(location1);
        }
    }

    map.on('mousemove', function(e) {
        map.featuresAt(e.point, {radius: 1, layer:'poly'}, function(err, features) {
            if (err) throw err;
            if(features.length > 0) {
                var ssid = "";
                //console.log(features);
                for(var i=0; i<features.length; i++) {
                    //ssid += JSON.stringify(features[i].geometry.coordinates, null, 2)+" ";
                    $scope.highlight(features[i].geometry.coordinates);
                }
                //document.getElementById('features').innerHTML = ssid;
            }
        });
    });

    map.on('click', function(e) {
        // xmax - xmin of hexagon edges
        console.log("click");
        var point = e.point;
    });

    map.on('moveend', function(e) {
        //console.log("map moved");
        var bounds = map.getBounds();
        //console.log(bounds);
        //$scope.hexTopology(20, 960, 900, bounds._sw);
    });

    $scope.updateLabels = function() {
        console.log("update");
        console.log(map);
        map.update();
        map.render();

        var layer = map.getSource('PasingWlan_BestLatLon');
        if(layer !== undefined) {
            console.log("reload");
            console.log(layer);
            layer.reload();
        } else {
            console.log('could not find layer');
        }
    }

}]);