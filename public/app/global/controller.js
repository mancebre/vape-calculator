angular.module('gelApp.global', []);

/**
 * Place for all global objects and methods.
 */

angular.module('gelApp.global').controller('homeCtrl', ['$rootScope', function ($rootScope) {
    $rootScope.testFunc = function () {
        if($rootScope.toggle) {
            $rootScope.something = ["one", "two"];
            $rootScope.toggle = false;
        } else {
            $rootScope.something = [1, 2, 3];
            $rootScope.toggle = true;
        }
    }
}]);
