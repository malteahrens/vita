angular.module('angularApp')
.controller('MapCtrl', [ '$scope', '$http', function($scope, $http) {
    $scope.dataPoints = [];
    $scope.map = {};
    $scope.username = 'Press a button...';
    $scope.grid = function() {
        $scope.username = "should load grid layer";
    }
    $scope.json = function() {
        $scope.username = "should load json layer";
        map.addSource("markers", {
            "type": "geojson",
            "maxzoom": 14,
            "data": "/PasingWlan.geojson"
        });

        map.addLayer({
            "id": "markers",
            "type": "symbol",
            "source": "markers",
            "interactive": true,
            "layout": {
                "icon-image": "marker-24",
                "icon-allow-overlap": true
            }
        });
    }

    mapboxgl.accessToken = 'pk.eyJ1IjoiLS1tYWx0ZWFocmVucyIsImEiOiJGU21QX2VVIn0.GVZ36UsnwYc_JfiQ61lz7Q';

    var map = new mapboxgl.Map({
        container: 'map',
        zoom: 12.5,
        center: [48.14882451158226, 11.451873779296875],
        style: 'https://www.mapbox.com/mapbox-gl-styles/styles/bright-v7.json',
        hash: true
    });

    map.addControl(new mapboxgl.Navigation());

    map.on('mousemove', function(e) {
        map.featuresAt(e.point, {radius: 1}, function(err, features) {
            if (err) throw err;
            if(features.length > 0) {
                var ssid = "";
                for(var i=0; i<features.length; i++) {
                    //ssid += JSON.stringify(features[i].geometry.coordinates, null, 2)+" ";
                    $scope.highlight(features[i].geometry.coordinates);
                }
                document.getElementById('features').innerHTML = ssid;
            }
        });
    });

    $scope.jsonHighlight = {
        "type": "Feature",
        "geometry": {
            "type": "Polygon",
            "coordinates": [[[11.44200325012207,48.124994388698326],[11.44399881362915,48.12599700035483],[11.44399881362915,48.126999592440086],[11.44200325012207,48.12800216495421],[11.44000768661499,48.126999592440086],[11.44000768661499,48.12599700035483],[11.44200325012207,48.124994388698326]]]
        }
    };
        
    $scope.highlight = function(features) {
        console.log(JSON.stringify(features));
        $scope.jsonHighlight = {
            "type": "Feature",
            "geometry": {
                "type": "Polygon",
                "coordinates": features
            }
        }
    }

    $scope.hexTopology = function(radius, width, height) {
        $scope.username = "started";

        var test = function(radius, width, height) {
            console.log("radius: "+radius);
            console.log("width: "+width);
            console.log("height: "+height);
            var dx = radius * 2 * Math.sin(Math.PI / 3),
                dy = radius * 2,
                m = Math.ceil((height + radius) / dy) + 1,
                n = Math.ceil(width / dx) + 1,
                geometries = [],
                arcs = [];

            for (var j = -1; j <= m; ++j) {
                for (var i = -1; i <= n; ++i) {
                    var y = j * 2, x = (i + (j & 1) / 2) * 2;
                    arcs.push([[x, y - 1], [1, 1]], [[x + 1, y], [0, 1]], [[x + 1, y + 1], [-1, 1]]);
                }
            }

            for (var j = 0, q = 3; j < m; ++j, q += 6) {
                for (var i = 0; i < n; ++i, q += 3) {
                    geometries.push({
                        type: "Polygon",
                        arcs: [[q, q + 1, q + 2, ~(q + (n + 2 - (j & 1)) * 3), ~(q - 2), ~(q - (n + 2 + (j & 1)) * 3 + 2)]],
                        fill: Math.random() > i / n * 2
                    });
                }
            }

            return {
                transform: {translate: [11.4, 48.12], scale: [0.002, 0.001]},
                objects: {hexagons: {type: "GeometryCollection", geometries: geometries}},
                arcs: arcs
            };
        };

        var topo = test(radius, width, height);
        //console.log(topo);
        //console.log(JSON.stringify(topo));

        var geojson = topojson.feature(topo, topo.objects.hexagons).features
        var final = {
            "type": "FeatureCollection",
            "features": geojson
        }
        $scope.username = final;
        map.addSource("grid", {
            "type": "geojson",
            "maxzoom": 14,
            "data": final
        });

        map.addLayer({
            "id": "poly",
            "type": "fill",
            "source": "grid",
            "interactive": true,
            "paint": {
                "fill-color": "transparent",
                "fill-outline-color": "#ff0000",
                "fill-opacity": 1
            }
        });

        map.addSource("json", {
            "type": "geojson",
            "maxzoom": 14,
            "data": $scope.jsonHighlight
        });

        map.addLayer({
            "type": "fill",
            "source": "json",
            "interactive": true,
            "paint": {
                "fill-color": "#ff0000",
                "fill-outline-color": "#ff0000",
                "fill-opacity": 1
            }
        });
    }
}]);