angular.module('gelApp.nicShot', []);

angular.module('gelApp.nicShot').controller('nicShotCtrl', ['$scope', function ($scope) {
	$scope.juice = {
        totalMl: 50,
        nicConcentration: 0, // ml/mg
        concentrationOfNicShot: 20, // ml/mg
        desiredStrength: 10, // ml/mg
        resultMl: 50
    };

	// TODO koncentracija nikotina trenutne tecnosti fali u jednacini!!!

	$scope.$watch('juice', function (newVal, oldVal) {
        $scope.juice.resultMl = ($scope.juice.desiredStrength * $scope.juice.totalMl) / 20;
    }, true);
        /**
         * resultMl = desiredStrength * 0.05 * totalMl
         */
}]);
