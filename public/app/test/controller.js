angular.module('agileApp.test', []);

angular.module('agileApp.test').controller('testCtrl', ['$scope', function ($scope) {
	$scope.something = ["one", "two"];
}]);
