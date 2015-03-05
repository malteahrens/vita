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
        HEADING1:  'Meine Grundwerte',
        PARA1: 'When I was 5 years old, my mom always told me that happiness was the key to life. When I went to school, they asked me what I wanted to be when I grew up. I wrote down \'happy\'. They told me I didn’t understand the assignment and I told them that they didn’t understand life. -John Lennon',
        HEADING2:  'Neugier',
        PARA2: 'Wir machen heute das, was andere nicht tun würden, damit wir morgen das können, was andere nicht können. Bei unseren alltäglichen Erkundungen tasten wir uns Schritt für Schritt an das gewünschte Ziel heran. Jeder unserer Irrwege bleibt kurz und wirft mehr Licht auf den richtigen Weg. Mit unseren Fehlern gehen wir ehrlich um - sie helfen uns, schneller erfolgreich zu sein. Wir sind freundlich und ehrlich, arbeiten hart und voller Neugier. Wir sind der Überzeugung, dass man im eigenen Beruf glücklich sein sollte. Wir sind es.',
        HEADING3:  'Leidenschaft',
        PARA3: 'Wir sind leidenschaftliche Gestalter und Erbauer virtueller Welten. Für die meisten von uns öffnete sich das Tor in dieses Universum an einem längst vergangenen Geburtstag, als unsere Eltern uns den ersten Commodore oder Atari schenkten. Die Entwicklung der realen Welt ermöglicht uns, unsere Leidenschaft in einem der spannendsten und zukunftssichersten Berufe auszuleben. Das freut uns sehr. '
    });

    // englische Sprache
    $translateProvider.translations('en_US', {
        APP_HEADLINE:  'Job Application',
        SUB_HEADLINE: 'Master of Cartography',
        PARA2: 'English Translation',
        HEADING1:      'Heading for new shores'
    });

    // Default Language
    $translateProvider.preferredLanguage('de_DE');
	$translateProvider.fallbackLanguage(['de_DE']);
    $translateProvider.useCookieStorage();
  });
