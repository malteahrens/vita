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
     'pascalprecht.translate'
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
        HEADING1:  'Auf zu neuen Ufern',
        PARA1: 'Über',
        APP_TEXT:  'Irgendein Text über eine großartige AngularJS App.'
    });

    // englische Sprache
    $translateProvider.translations('en_US', {
        APP_HEADLINE:  'Job Application',
        SUB_HEADLINE: 'Master of Cartography',
        HEADING1:      'Heading for new shores'
    });

    // Default Language
    $translateProvider.preferredLanguage('de_DE');
	$translateProvider.fallbackLanguage(['de_DE']);
  });
