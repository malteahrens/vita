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

    $translateProvider.translations('de', {
        APP_HEADLINE:  'Großartige AngularJS App',
            NAV_HOME:  'Zur Startseite',
            NAV_ABOUT: 'Über',
            APP_TEXT:  'Irgendein Text über eine großartige AngularJS App.'
    });

    // Default Language
    $translateProvider.preferredLanguage('de');
  });
