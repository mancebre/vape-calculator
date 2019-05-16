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
                
                $scope.juice.resultMl = ($scope.juice.desiredStrength - $scope.juice.nicConcentration)
                / ($scope.juice.concentrationOfNicShot - $scope.juice.desiredStrength) * $scope.juice.totalMl;
                $scope.juice.resultMl = $scope.juice.resultMl.toFixed(2);
        }
    };

    $scope.validateDesiredStrenght = function() {
        if($scope.juice.desiredStrength >= $scope.juice.concentrationOfNicShot
            && $scope.juice.desiredStrength > 0) {
            $scope.juice.desiredStrength = $scope.juice.concentrationOfNicShot - 1;
        }
    };

    $scope.validateNicConcentration = function() {
        if($scope.juice.desiredStrength < $scope.juice.nicConcentration
            && $scope.juice.desiredStrength > 0) {
            $scope.juice.desiredStrength = $scope.juice.nicConcentration;
        }
    }

	$scope.$watch('juice', function (newVal, oldVal) {
        $scope.validateDesiredStrenght();
        $scope.validateNicConcentration();
        $scope.calculate();
    }, true);
}]);
