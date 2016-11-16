angular.module('gelApp.test', []);

angular.module('gelApp.test').controller('testCtrl', ['$rootScope', '$scope', 'myService', function ($rootScope, $scope, myService) {
    $rootScope.toggle = false;
	$rootScope.something = ["one", "two"];

    myService.foo();
}]);
