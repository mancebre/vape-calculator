angular.module('gelApp.editWeights', []);

angular.module('gelApp.editWeights').controller('editWeightsCtrl', ['$scope', 'item', '$uibModalInstance', function ($scope, item, $uibModalInstance) {

    $scope.item = item;

    $scope.save = function() {
        localStorage.setItem('weights', JSON.stringify($scope.item));
        $uibModalInstance.close($scope.item);
    };

    $scope.close = function(){
        $uibModalInstance.close(undefined);
    };

    $scope.$watch('item', function(newVal, oldVal){
        // Check for negative values TODO this wont work :(
        console.log(item.every($scope.validateNumber));
    }, true);

    // Inputs must be positive numbers
    $scope.validateNumber = function(input) {
        return input > 1;
    }
}]);
