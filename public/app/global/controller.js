angular.module('gelApp.global', []);

/**
 * Place for all global objects and methods.
 */

angular.module('gelApp.global').controller('homeCtrl', ['$rootScope', '$scope', function ($rootScope, $scope) {
    $rootScope.testFunc = function () {
        $rootScope.something = [1, 2, 3];
    }
}]);
