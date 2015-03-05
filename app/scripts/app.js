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
        APP_HEADLINE:  'Reference',
        SUB_HEADLINE: 'Dipl.-Ing. (FH) Kartographie',
        HEADING1:  'dsfasd',
        PARA1: 'dsf',
        HEADING2:  'Nasdf',
        PARA2: 'xy',
        HEADING3:  'dsfsa',
        PARA3: 'dsfadsf'
    });

    // englische Sprache
    $translateProvider.translations('en_US', {
        APP_HEADLINE:  'adsf',
        SUB_HEADLINE: 'adsf',
        PARA2: 'English Translation',
        HEADING1:      'dfasdf'
    });

    // Default Language
    $translateProvider.preferredLanguage('de_DE');
	$translateProvider.fallbackLanguage(['de_DE']);
    $translateProvider.useCookieStorage();
  });
