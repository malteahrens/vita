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
            "data": "/data/geojson/PasingWlan_BestLatLon.geojson"
        });

        map.addLayer({
            "id": "marker",
            "type": "symbol",
            "source": "markers",
            "interactive": true,
            "layout": {
                "icon-image": "marker-24",
                "icon-allow-overlap": true
            }
        });
    }

    $scope.loadAllGeojson = function() {
        $scope.username = "should load all geojson json layer";
        map.addSource("markersAll", {
            "type": "geojson",
            "maxzoom": 14,
            "data": "/data/geojson/PasingWlan.geojson"
        });

        map.addLayer({
            "id": "markerAll",
            "type": "symbol",
            "source": "markersAll",
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
        var dx = $scope.features[0][1][0] - $scope.features[0][4][0];
        var dy = $scope.features[0][3][1] - $scope.features[0][0][1];
        var x = $scope.features[0][4][0] + dx/2;
        var y = $scope.features[0][0][1] + dy/2;
        var point = map.project([y, x]);
        console.log("calculated: "+JSON.stringify(point));
        console.log("click at: "+JSON.stringify(e.point));
        document.getElementById('features').innerHTML = $scope.features;
        $scope.debug([x, y]);

        // calculate radius of hexagon in pixel
        var xMax = map.project([0, $scope.features[0][1][0]]);
        var xMin = map.project([0, $scope.features[0][4][0]]);
        var radius = (xMax.x-xMin.x)/2;
        //console.log(radius);
        map.featuresAt(point, {radius: radius, layer: 'marker'}, function(err, features) {
            if (err) throw err;
            console.log(features.length);
            $scope.highlightPoints(features);
            document.getElementById('features').innerHTML = features;
        });
    });

    map.on('moveend', function(e) {
        console.log("map moved");
        var bounds = map.getBounds();
        console.log(bounds);
        $scope.hexTopology(20, 960, 900, bounds._sw);
    });

   $scope.highlightSource = {}
   $scope.debugSource = {}
   $scope.features = {}
   $scope.highlight = function(features) {
        if(features.length==1) {
            $scope.features = features;
            var jsonHighlight = {
                "type": "Feature",
                "geometry": {
                    "type": "Polygon",
                    "coordinates": features
                }
            }
            $scope.highlightSource.setData(jsonHighlight);
        }
    }

   $scope.highlightPoints = function(features) {
       var json = {
           "type": "FeatureCollection",
           "features": features
       }

       $scope.pointSource.setData(json);
   }

    $scope.debug = function(features) {
        var debug = {
            "type": "FeatureCollection",
            "features": [{
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": features
                }
            }]
        }
        $scope.debugSource.setData(debug);
    }

    $scope.hexTopology = function(radius, width, height, sw) {
        $scope.username = "started";

        var test = function(radius, width, height) {
            //console.log("radius: "+radius);
            //console.log("width: "+width);
            //console.log("height: "+height);
            var dx = radius * 2 * Math.sin(Math.PI / 3),
                dy = radius * 1.5,
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

            //console.log(arcs);
            //console.log(geometries);
            console.log(sw.lat);
            console.log(sw.lng);

            return {
                transform: {translate: [sw.lng, sw.lat], scale: [0.002, 0.001]},
                objects: {hexagons: {type: "GeometryCollection", geometries: geometries}},
                arcs: arcs
            };
        };

        var topo = test(radius, width, height);
        /*console.log(topo.objects.hexagons.geometries[0].arcs);
        console.log(topo.arcs[3]);
        console.log(topo.arcs[4]);
        console.log(topo.arcs[5]);
        console.log(topo.arcs[96]);
        console.log(topo.arcs[1]);
        console.log(topo.arcs[87]);*/
        //console.log(JSON.stringify(topo));

        var flipCoordinates = function(flip, gjCoord) {
            console.log("flip: "+flip);
            console.log("gj: "+gjCoord);
            for(var i=0;i<flip.length;i++) {

                var coord1 = gjCoord[(flip[i])*2];
                var coord2 = gjCoord[(flip[i]*2+1)];

                console.log(coord1+" / "+coord2);
                gjCoord[(flip[i])*2] = [coord1[0]+coord2[0], coord1[1]+coord2[1]] ;
                gjCoord[(flip[i])*2+1] = [coord2[0]*-1, coord2[1]*-1];
            }

            return gjCoord;
        }

        //for(var i=0;i<topo.objects.hexagons.geometries.length;i++){
        for(i=0;i<1;i++){
            var geom = topo.objects.hexagons.geometries[i].arcs[0];
            var gj = [];
            var flip = [];

            console.log(geom);
            for(j=0;j<geom.length;j++){
                var arcIndex = geom[j];
                //console.log("Processing "+j+" element...");

                // A negative arc index indicates that the arc at the ones’ complement of the index
                // must be reversed to reconstruct the geometry: -1 refers to the reversed first arc,
                // -2 refers to the reversed second arc, and so on.

                // test if number is negative, if yes multiply by -1 and add one, flip coordinates
                if (arcIndex < 0) {
                    // detected negative number and find index
                    arcIndex = (arcIndex * (-1))-1;
                    // flip coordinates
                    //console.log("found negative number at index "+j+", "+geom[j]+", corrected to "+arcIndex+" and flipped");
                    flip.push(j);
                }

                var tjCoord = topo.arcs[arcIndex];
                gj.push([tjCoord[0][0],tjCoord[0][1]],[tjCoord[1][0],tjCoord[1][1]])
            }

            console.log(gj);
            var flipped = flipCoordinates(flip, gj);
            console.log(flipped);
            var geojson = { "type": "FeatureCollection",
                "features": [
                    { "type": "Feature",
                        "geometry": {
                            "type": "Polygon",
                            "coordinates": [flipped]
                        },
                        "properties": {
                            "index": j
                        }
                    }
                ]
            }


            //console.log(JSON.stringify(geojson));
        }

        // search in array for two entries
        for(i=0;i<topo.arcs.length;i++){
            var x1 = topo.arcs[i][0][0];
            var y1 = topo.arcs[i][0][1];
            var x2 = topo.arcs[i][1][0];
            var y2 = topo.arcs[i][1][1];
            /**
            console.log("----");
            console.log("x1: "+x1);
            console.log("y1: "+y1);
            console.log("----");
            console.log("x2: "+x2);
            console.log("y2: "+y2);
            console.log("----");**/
            if(x1 == 1 && y1 == -3 && x2 == -1 && y2 == 1) {
                //console.log("!!! HIT !!! at index "+i)
            }

            if(x1 == 0 && y1 == -2 && x2 == 1 && y2 == -3) {
                //console.log("!!! HIT !!! at index "+i)
            }
        }

        var geojson = topojson.feature(topo, topo.objects.hexagons).features
        //var geojson = topojson.mesh(topo, topo.objects.hexagon);
        var final = {
            "type": "FeatureCollection",
            "features": geojson
        }
        $scope.username = final;
        var source = map.getSource("grid");
        console.log("source: "+source);
        if(source != undefined) {
            map.removeSource("grid");
            map.removeLayer("poly");
        };
        $scope.highlightSource = map.addSource("grid", {
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
        }, "poly");

        $scope.highlightSource = new mapboxgl.GeoJSONSource({
            data: {
                "type": "FeatureCollection",
                "features": {
                    "type": "Feature",
                    "geometry": {
                        "type": "Polygon",
                        "coordinates": [[[11.44200325012207,48.124994388698326],[11.44399881362915,48.12599700035483],[11.44399881362915,48.126999592440086],[11.44200325012207,48.12800216495421],[11.44000768661499,48.126999592440086],[11.44000768661499,48.12599700035483],[11.44200325012207,48.124994388698326]]]
                    }
                }
            }
        });
        map.addSource('json', $scope.highlightSource); // add

        map.addLayer({
            "id": "json",
            "type": "fill",
            "source": "json",
            "interactive": false,
            "paint": {
                "fill-color": "#ff0000",
                "fill-outline-color": "#ff0000",
                "fill-opacity": 0.6
            }
        });

        $scope.debugSource = new mapboxgl.GeoJSONSource({
            data: {
                "type": "FeatureCollection",
                "features": [{
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [11.44200325012207,48.124994388698326]
                    }
                }]
            }
        });
        map.addSource('debug', $scope.debugSource);
        map.addLayer({
            "id": "debug",
            "type": "symbol",
            "source": "debug",
            "layout": {
                "icon-image": "harbor-12",
                "text-font": "Open Sans Semibold, Arial Unicode MS Bold",
                "text-offset": [0, 0.6],
                "text-anchor": "top"
            },
            "paint": {
                "text-size": 12
            }
        });

        $scope.pointSource = new mapboxgl.GeoJSONSource({
            data: {
                "type": "FeatureCollection",
                "features": [{
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [11.44200325012207,48.124994388698326]
                    }
                }]
            }
        });
        map.addSource('pointHighlight', $scope.pointSource);
        map.addLayer({
            "id": "pointLayer",
            "type": "symbol",
            "source": "pointHighlight",
            "layout": {
                "icon-image": "harbor-12",
                "text-font": "Open Sans Semibold, Arial Unicode MS Bold",
                "text-offset": [0, 0.6],
                "text-anchor": "top"
            },
            "paint": {
                "text-size": 12
            }
        });
    }
}]);