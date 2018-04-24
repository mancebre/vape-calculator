angular.module('gelApp.editWeights', []);

angular.module('gelApp.editWeights').controller('editWeightsCtrl', ['$scope', 'item', '$uibModalInstance', '$timeout', function ($scope, item, $uibModalInstance, $timeout) {

    $scope.disableSave = false;
    $scope.weights = item;
    // Create a copy of data to print in modal
    $scope.item = angular.copy(item);

    $scope.save = function() {
        localStorage.setItem('weights', JSON.stringify($scope.item));

        $uibModalInstance.close($scope.item);
    };

    $scope.close = function(){
        $uibModalInstance.close(undefined);
    };

    // Disable save if any of inputs is negative or zero.
    $scope.$watch('item', function(newVal, oldVal){

        var keys = Object.keys($scope.item);
        var len = keys.length;

        // Count bad inputs
        var countNegativeItems = 0;
        angular.forEach($scope.item, function(val) {
            if(val > 0) {
                countNegativeItems++;
            }
        });

        // Number of input field and number of positive answers must be equal
        if(countNegativeItems !== len) {
            $scope.disableSave = true;
        } else {
            $scope.disableSave = false;
        }
    }, true);
}]);
