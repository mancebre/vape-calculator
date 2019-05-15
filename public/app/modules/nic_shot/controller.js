angular.module('gelApp.nicShot', []);

angular.module('gelApp.nicShot').controller('nicShotCtrl', ['$scope', function ($scope) {
	$scope.juice = {
        totalMl: null,
        nicConcentration: null, // ml/mg
        concentrationOfNicShot: null, // ml/mg
        desiredStrength: null, // ml/mg
        resultMl: null
    };

    $scope.calculate = function() {
        if($scope.juice.totalMl !== null
            && $scope.juice.nicConcentration !== null
            && $scope.juice.concentrationOfNicShot !== null
            && $scope.juice.desiredStrength !== null) {
                
                // TODO Need more validation!!!
                $scope.juice.resultMl = ($scope.juice.desiredStrength - $scope.juice.nicConcentration)
                / ($scope.juice.concentrationOfNicShot - $scope.juice.desiredStrength) * $scope.juice.totalMl;
                $scope.juice.resultMl = $scope.juice.resultMl.toFixed(2);
        }
    }

	$scope.$watch('juice', function (newVal, oldVal) {
        $scope.calculate();
    }, true);
}]);
