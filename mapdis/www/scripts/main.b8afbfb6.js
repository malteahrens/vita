"use strict";function gestureStart(){for(i=0;i<metas.length;i++)"viewport"==metas[i].name&&(metas[i].content="width=device-width, minimum-scale=0.25, maximum-scale=1.6")}angular.module("angularApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","ngCordova","pascalprecht.translate","angular-vibrator","geolocation"]).config(["$routeProvider","$translateProvider","vibratorProvider",function(a,b,c){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl"}).otherwise({redirectTo:"/"}),b.translations("de_DE",{APP_HEADLINE:"Bewerbung",SUB_HEADLINE:"Dipl.-Ing. (FH) Kartographie",HEADING1:"Ja ja ja",PARA1:"Über",APP_TEXT:"Irgendein Text über eine großartige AngularJS App."}),b.translations("en_US",{APP_HEADLINE:"Job Application",SUB_HEADLINE:"Master of Cartography",PARA2:"English Translation",HEADING1:"Nothing here"}),b.preferredLanguage("de_DE"),b.fallbackLanguage(["de_DE"]),b.useCookieStorage();var d={"default":900,twice:[200,100,300],"long":2500};c.setSequences(d)}]);var metas=document.getElementsByTagName("meta"),i;if(navigator.userAgent.match(/iPhone/i)){for(i=0;i<metas.length;i++)"viewport"==metas[i].name&&(metas[i].content="width=device-width, minimum-scale=1.0, maximum-scale=1.0");document.addEventListener("gesturestart",gestureStart,!1)}angular.module("angularApp").controller("MainCtrl",["$scope",function(a){a.imgSrc="images/yeoman.png",a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"],a.things=[{item:"one"},{item:"two"},{item:"three"}],a.mouseOverThing=function(a){}}]),angular.module("angularApp").controller("LangCtrl",["$scope","$translate",function(a,b){a.changeLang=function(a){b.use(a).then(function(a){console.log("Sprache zu "+a+" gewechselt.")},function(a){console.log("Could not find key."+a)})},a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("angularApp").directive("mouseover",function(){return{restrict:"EA",link:function(a,b,c){b.bind("mouseenter",function(b){a.$apply(function(){a.imgSrc=c.mouseover})})}}}),angular.module("angularApp").directive("fadeIn",["$animate",function(a){return{restrict:"A",scope:{ngSrc:"@"},link:function(b,c,d){c.on("load",function(){}).on("error",function(){console.log("error loading image")}),b.$watch("ngSrc",function(d){var e;void 0!=e&&(a.cancel(e),a.removeClass(c,"fadein")),e=a.addClass(c,"fadein"),e.then(function(){a.removeClass(c,"fadein"),b.$apply()})})}}}]);var cordovaModule=angular.module("cordova",[]);cordovaModule.factory("deviceReady",function(){return console.log("factory loaded"),function(a){console.log("inside factory");var b=-1===document.URL.indexOf("http://")&&-1===document.URL.indexOf("https://");a()}});var geolocationModule=angular.module("geolocation",["cordova"]);geolocationModule.factory("getCurrentPosition",["deviceReady","$document","$window","$rootScope",function(a,b,c,d){return console.log("device ready..."),function(b){console.log("function call"),a(function(){navigator.geolocation.getCurrentPosition(function(a){d.$apply(function(){alert(a)})},function(a){d.$apply(function(){throw alert("got error during locating"),new Error("Unable to retreive position")})})})}}]),angular.module("angularApp").controller("MapCtrl",["$scope","$http","$window","getCurrentPosition",function(a,b,c,d){a.dataPoints=[],a.map={},a.username="Press a button...",a.grid=function(){a.username="should load grid layer"},d(),a.headingSensor=0,window.DeviceOrientationEvent?c.addEventListener("deviceorientation",function(b){a.headingSensor=b.alpha,a.$apply()},!1):alert("no device orientation supported..."),mapboxgl.accessToken="pk.eyJ1IjoiLS1tYWx0ZWFocmVucyIsImEiOiJGU21QX2VVIn0.GVZ36UsnwYc_JfiQ61lz7Q";var e=new mapboxgl.Map({container:"map",zoom:12.5,center:[48.14882451158226,11.451873779296875],style:"https://www.mapbox.com/mapbox-gl-styles/styles/bright-v7.json",minZoom:9,maxZoom:20,hash:!0,interactive:!0});e.addControl(new mapboxgl.Navigation),e.on("load",function(b){console.log("map loaded..."),a.addGeojsonLayer({name:"Pasing"}),a.addGeojsonLayer({name:"locationAccuracy"}),a.addGeojsonLayer({name:"locationHeading"}),a.addGeojsonLayer({name:"location"})}),a.setPointData=function(a,b){var c=e.getSource(a);if(void 0!==c){var d={type:"Feature",geometry:{type:"Point",coordinates:b}};c.setData(d)}else console.log("Couldn't update data: layer not found")},a.setBufferData=function(a,b,c){try{var d=e.getSource(a);if(void 0!==d){var f={type:"Feature",geometry:{type:"Point",coordinates:b}},g=turf.buffer(f,c,"kilometers");d.setData(g)}else console.log("Couldn't update data: layer not found")}catch(h){document.getElementById("features").innerHTML=h.message}},a.setLineData=function(a,b){var c=e.getSource(a);void 0!==c?c.setData(b):console.log("Couldn't update data: layer not found")},a.layerList=[],a.toggleLayer=function(a){console.log("toggle layer: "+a);var b=e.getLayoutProperty(a,"visibility"),c="none";"none"===b&&(c="visible"),e.setLayoutProperty(a,"visibility",c)},a.addGeojsonLayer=function(b,c){void 0===c&&(c=!0);var d={Pasing:{type:"line",layout:{visibility:c},paint:{"line-color":"#ff0000","line-width":2}},PasingWlan_BestLatLon:{type:"symbol",layout:{"icon-image":"circle-12","icon-allow-overlap":!0,"icon-color":"#669966","text-field":"{bssid}","text-font":"Open Sans Semibold, Arial Unicode MS Bold","text-anchor":"bottom-left","icon-ignore-placement":!0,"icon-padding":0,"text-padding":0,"text-optional":!0,"text-allow-overlap":!1,"text-ignore-placement":!1,visibility:c},paint:{"icon-size":.5,"text-size":10,"text-halo-color":"#ffffff","text-translate":[4,2],"text-halo-width":1}},PasingWlan_Sqlite:{type:"symbol",layout:{"icon-image":"{maki}-12","icon-allow-overlap":!0,"icon-color":"#669966","text-field":"{ssid}","text-font":"Open Sans Semibold, Arial Unicode MS Bold","text-anchor":"bottom-left","icon-ignore-placement":!0,"icon-padding":0,"text-padding":0,"text-optional":!0,"text-allow-overlap":!1,"text-ignore-placement":!1,visibility:c},paint:{"icon-size":.5,"text-size":10,"text-halo-color":"#ffffff","text-translate":[4,2],"text-halo-width":1}},PasingWlan_Centroid:{type:"symbol",layout:{"icon-image":"circle-12","icon-allow-overlap":!0,"icon-color":"#669966","text-field":"{ssid}","text-font":"Open Sans Semibold, Arial Unicode MS Bold","text-anchor":"bottom-left","text-optional":!0,"text-allow-overlap":!0,"text-ignore-placement":!0,alwaysVisible:!0,visibility:c},paint:{"icon-size":.5,"icon-color":"#669966","line-color":"#ff0000","line-width":2,"text-size":10,"text-halo-color":"#ffffff","text-translate":[4,2],"text-halo-width":4}},location:{type:"symbol",layout:{"icon-image":"circle-12"},paint:{"icon-size":1,"icon-color":"#669966"}},locationAccuracy:{type:"fill",layout:{visibility:c},paint:{"fill-outline-color":"#ff0000","fill-color":"#ff0000","fill-opacity":.2}},locationHeading:{type:"line",layout:{visibility:c},paint:{"line-color":"#ff0000","line-width":2}}},f="";f="location"!==b.name&&"locationAccuracy"!==b.name?"http://malteahrens.de/data/geojson/"+b.name+".geojson":[0,0],e.addSource(b.name,{type:"geojson",data:f}),e.addLayer({id:b.name,type:d[b.name].type,source:b.name,interactive:!0,layout:d[b.name].layout,paint:d[b.name].paint}),a.layerList.push(b.name),a.$apply()};var f=e.transform.zoom;e.on("zoom",function(){var a=e.getSource("PasingWlan_Sqlite");void 0!==a?(e.transform.zoom>18.5&&18.5>f?(console.log("show labels"),e.setLayoutProperty("PasingWlan_Sqlite","text-allow-overlap",!0)):e.transform.zoom<18.5&&f>18.5&&(console.log("hide labels"),e.setLayoutProperty("PasingWlan_Sqlite","text-allow-overlap",!1)),f=e.transform.zoom):console.log("could not find layer")}),a.trackLocation=!1,a.speed=0,a.heading=0,a.accuracy=0;var g=0;a.toggleTrackLocation=function(){function b(){var a={timeout:6e4};navigator&&navigator.geolocation?navigator.geolocation.getCurrentPosition(d,c,a):console.log("Geolocation is not supported")}function c(a){1==a.code?alert("Error: Access is denied!"):2==a.code&&alert("Error: Position is unavailable!")}function d(b){var c=[b.coords.latitude,b.coords.longitude],d=[b.coords.longitude,b.coords.latitude],f={type:"Feature",properties:{"marker-color":"#0f0"},geometry:{type:"Point",coordinates:d}};if(!isNaN(b.coords.heading)){console.log("heading: "+b.coords.heading),a.heading=b.coords.heading;try{var g=a.headingSensor;console.log(g),g>180&&(g-=180);var h=turf.destination(f,.1,g,"kilometers"),i=turf.linestring([d,h.geometry.coordinates]);a.setLineData("locationHeading",i)}catch(j){document.getElementById("features").innerHTML=j.message}}isNaN(b.coords.speed)||(a.speed=b.coords.speed),isNaN(b.coords.accuracy)||(a.accuracy=b.coords.accuracy),e.easeTo({center:c,duration:0});var k=.001*b.coords.accuracy;a.setBufferData("locationAccuracy",d,k),a.$apply()}a.trackLocation=!a.trackLocation,a.trackLocation?g=self.setInterval(b,2e3):clearInterval(g)},e.on("mousemove",function(b){e.featuresAt(b.point,{radius:1,layer:"poly"},function(b,c){if(b)throw b;if(c.length>0)for(var d=0;d<c.length;d++)a.highlight(c[d].geometry.coordinates)})}),e.on("click",function(a){console.log("click");var b=a.point;e.featuresAt(b,{radius:10,layer:"PasingWlan_BestLatLon"},function(a,b){if(a)throw a;console.log(b.length),console.log(b),document.getElementById("features").innerHTML=b})}),e.on("moveend",function(a){e.getBounds()}),a.highlightSource={},a.debugSource={},a.features={},a.highlight=function(b){if(1==b.length){a.features=b;var c={type:"Feature",geometry:{type:"Polygon",coordinates:b}};a.highlightSource.setData(c)}},a.updateLabels=function(){console.log("update"),console.log(e),e.update(),e.render();var a=e.getSource("PasingWlan_BestLatLon");void 0!==a?(console.log("reload"),console.log(a),a.reload()):console.log("could not find layer")},a.highlightPoints=function(b){var c={type:"FeatureCollection",features:b};a.pointSource.setData(c)},a.debug=function(b){var c={type:"FeatureCollection",features:[{type:"Feature",geometry:{type:"Point",coordinates:b}}]};a.debugSource.setData(c)},a.hexTopology=function(b,c,d,f){a.username="started";var g=function(a,b,c){for(var d=2*a*Math.sin(Math.PI/3),e=1.5*a,g=Math.ceil((c+a)/e)+1,h=Math.ceil(b/d)+1,i=[],j=[],k=-1;g>=k;++k)for(var l=-1;h>=l;++l){var m=2*k,n=2*(l+(1&k)/2);j.push([[n,m-1],[1,1]],[[n+1,m],[0,1]],[[n+1,m+1],[-1,1]])}for(var k=0,o=3;g>k;++k,o+=6)for(var l=0;h>l;++l,o+=3)i.push({type:"Polygon",arcs:[[o,o+1,o+2,~(o+3*(h+2-(1&k))),~(o-2),~(o-3*(h+2+(1&k))+2)]],fill:Math.random()>l/h*2});return console.log(f.lat),console.log(f.lng),{transform:{translate:[f.lng,f.lat],scale:[.002,.001]},objects:{hexagons:{type:"GeometryCollection",geometries:i}},arcs:j}},h=g(b,c,d),k=function(a,b){console.log("flip: "+a),console.log("gj: "+b);for(var c=0;c<a.length;c++){var d=b[2*a[c]],e=b[2*a[c]+1];console.log(d+" / "+e),b[2*a[c]]=[d[0]+e[0],d[1]+e[1]],b[2*a[c]+1]=[-1*e[0],-1*e[1]]}return b};for(i=0;1>i;i++){var l=h.objects.hexagons.geometries[i].arcs[0],m=[],n=[];for(console.log(l),j=0;j<l.length;j++){var o=l[j];0>o&&(o=-1*o-1,n.push(j));var p=h.arcs[o];m.push([p[0][0],p[0][1]],[p[1][0],p[1][1]])}console.log(m);var q=k(n,m);console.log(q);var r={type:"FeatureCollection",features:[{type:"Feature",geometry:{type:"Polygon",coordinates:[q]},properties:{index:j}}]}}for(i=0;i<h.arcs.length;i++){h.arcs[i][0][0],h.arcs[i][0][1],h.arcs[i][1][0],h.arcs[i][1][1]}var r=topojson.feature(h,h.objects.hexagons).features,s={type:"FeatureCollection",features:r};a.username=s;var t=e.getSource("grid");console.log("source: "+t),void 0!=t&&(e.removeSource("grid"),e.removeLayer("poly")),a.highlightSource=e.addSource("grid",{type:"geojson",maxzoom:14,data:s}),e.addLayer({id:"poly",type:"fill",source:"grid",interactive:!0,paint:{"fill-color":"transparent","fill-outline-color":"#ff0000","fill-opacity":1}},"poly"),a.highlightSource=new mapboxgl.GeoJSONSource({data:{type:"FeatureCollection",features:{type:"Feature",geometry:{type:"Polygon",coordinates:[[[11.44200325012207,48.124994388698326],[11.44399881362915,48.12599700035483],[11.44399881362915,48.126999592440086],[11.44200325012207,48.12800216495421],[11.44000768661499,48.126999592440086],[11.44000768661499,48.12599700035483],[11.44200325012207,48.124994388698326]]]}}}}),e.addSource("json",a.highlightSource),e.addLayer({id:"json",type:"fill",source:"json",interactive:!1,paint:{"fill-color":"#ff0000","fill-outline-color":"#ff0000","fill-opacity":.6}}),a.debugSource=new mapboxgl.GeoJSONSource({data:{type:"FeatureCollection",features:[{type:"Feature",geometry:{type:"Point",coordinates:[11.44200325012207,48.124994388698326]}}]}}),e.addSource("debug",a.debugSource),e.addLayer({id:"debug",type:"symbol",source:"debug",layout:{"icon-image":"harbor-12","text-font":"Open Sans Semibold, Arial Unicode MS Bold","text-offset":[0,.6],"text-anchor":"top"},paint:{"text-size":12}}),a.pointSource=new mapboxgl.GeoJSONSource({data:{type:"FeatureCollection",features:[{type:"Feature",geometry:{type:"Point",coordinates:[11.44200325012207,48.124994388698326]}}]}}),e.addSource("pointHighlight",a.pointSource),e.addLayer({id:"pointLayer",type:"symbol",source:"pointHighlight",layout:{"icon-image":"harbor-12","text-font":"Open Sans Semibold, Arial Unicode MS Bold","text-offset":[0,.6],"text-anchor":"top"},paint:{"text-size":12}})}}]),angular.module("angularApp").controller("VibrationsCtrl",["$scope","vibrator",function(a,b){a.vibrate=function(a){b.vibrate(a)}}]);