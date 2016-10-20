angular.module('gelApp.test', []);

angular.module('gelApp.test').controller('testCtrl', ['$rootScope', '$scope', function ($rootScope, $scope) {
	$rootScope.something = ["one", "two"];
}]);
