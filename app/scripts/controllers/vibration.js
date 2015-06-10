angular.module('angularApp')
.controller('VibrationsCtrl', ['$scope', 'vibrator', function($scope, vibrator){

    $scope.vibrate = function(duration) {
        vibrator.vibrate(duration);
    };
}]);