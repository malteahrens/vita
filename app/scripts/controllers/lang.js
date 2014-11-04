'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:LangCtrl
 * @description
 * # LangCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
    .controller('LangCtrl', function ($scope, $translate) {
        $scope.changeLang = function (key) {
            $translate.use(key).then(function (key) {
                console.log("Sprache zu " + key + " gewechselt.");
            }, function (key) {
                console.log("Irgendwas lief schief.");
            });
        };
    });