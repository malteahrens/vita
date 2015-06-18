angular.module('angularApp')
    .controller('MapCtrl', [ '$scope', '$http', '$window', 'getCurrentPosition', function($scope, $http, $window, getCurrentPosition) {
        $scope.dataPoints = [];
        $scope.map = {};
        $scope.username = 'Press a button...';
        $scope.grid = function() {
            $scope.username = "should load grid layer";
        }
        getCurrentPosition();

        // access the device compass sensor
        $scope.headingSensor = 0;
        if (window.DeviceOrientationEvent) {
            $window.addEventListener('deviceorientation', function(event) {
                $scope.headingSensor = event.alpha;
                $scope.$apply();
            }, false);
        } else {
            alert("no device orientation supported...");
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
            try {
                var layer = map.getSource(layerId);
                if (layer !== undefined) {
                    var point = {
                        "type": "Feature",
                        "geometry": {
                            "type": "Point",
                            "coordinates": data
                        }
                    }

                    var buffered = turf.buffer(point, radius, 'kilometers')
                    layer.setData(buffered);
                } else {
                    console.log("Couldn't update data: layer not found");
                }
            } catch(err) {
                document.getElementById("features").innerHTML = err.message;
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

                var point = {
                    "type": "Feature",
                    "properties": {
                        "marker-color": "#0f0"
                    },
                    "geometry": {
                        "type": "Point",
                        "coordinates": location2
                    }
                };

                if(!isNaN(position.coords.heading)) {
                    console.log("heading: "+position.coords.heading);
                    $scope.heading = position.coords.heading;
                    try {


                        // heading direction from sensor
                        var heading = $scope.headingSensor;
                        // heading direction from GPS
                        //var heading = position.coords.heading;
                        console.log(heading);
                        if(heading > 180) {
                            heading = heading - 180;
                        }
                        var headingDirection = turf.destination(point, 0.1, heading, "kilometers");
                        var headingDirectionLine = turf.linestring([
                            location2,
                            headingDirection.geometry.coordinates
                        ]);
                        $scope.setLineData("locationHeading", headingDirectionLine);
                    } catch(err) {
                        document.getElementById("features").innerHTML = err.message;
                    }
                }
                if(!isNaN(position.coords.speed)) {
                    $scope.speed = position.coords.speed;
                }
                if(!isNaN(position.coords.accuracy)) {
                    $scope.accuracy = position.coords.accuracy;
                }

                //$scope.setPointData("location", location2)
                map.easeTo({ center: location1, duration: 0 });
                var radius = position.coords.accuracy * 0.001
                $scope.setBufferData("locationAccuracy", location2, radius);
                $scope.$apply()
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
            /*
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
             */
            //console.log(radius);
            map.featuresAt(point, {radius: 10, layer: 'PasingWlan_BestLatLon'}, function(err, features) {
                if (err) throw err;
                console.log(features.length);
                console.log(features);
                //$scope.highlightPoints(features);
                document.getElementById('features').innerHTML = features;
            });
        });

        map.on('moveend', function(e) {
            //console.log("map moved");
            var bounds = map.getBounds();
            //console.log(bounds);
            //$scope.hexTopology(20, 960, 900, bounds._sw);
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