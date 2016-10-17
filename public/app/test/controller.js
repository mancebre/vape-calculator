angular.module('gelApp.test', []);

angular.module('gelApp.test').controller('testCtrl', ['$scope', function ($scope) {
	$scope.something = ["one", "two"];
}]);
