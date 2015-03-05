'use strict';

/**
 * @ngdoc overview
 * @name angularApp
 * @description
 * # angularApp
 *
 * Main module of the application.
 */
angular
  .module('angularApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'pascalprecht.translate',
    'leaflet-directive'
  ])
  .config(function ($routeProvider, $translateProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

    $translateProvider.translations('de_DE', {
        APP_HEADLINE:  'Bewerbung',
        SUB_HEADLINE: 'Dipl.-Ing. (FH) Kartographie',
        HEADING1:  'Ja ja ja',
        PARA1: 'Über',
        APP_TEXT:  'Irgendein Text über eine großartige AngularJS App.'
    });

    // englische Sprache
    $translateProvider.translations('en_US', {
        APP_HEADLINE:  'Job Application',
        SUB_HEADLINE: 'Master of Cartography',
        PARA2: 'English Translation',
        HEADING1:      'Nothing here'
    });

    // Default Language
    $translateProvider.preferredLanguage('de_DE');
	$translateProvider.fallbackLanguage(['de_DE']);
    $translateProvider.useCookieStorage();
  });
