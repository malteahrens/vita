'use strict';

describe('Controller: LangCtrl', function () {

  // load the controller's module
  beforeEach(module('angularApp'));

  var LangCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LangCtrl = $controller('LangCtrl', {
      $scope: scope
    });
  }));
});
