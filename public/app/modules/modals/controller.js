angular.module('gelApp.editWeights', []);

angular.module('gelApp.editWeights').controller('editWeightsCtrl', ['$scope', 'item', '$uibModalInstance', function ($scope, item, $uibModalInstance) {

    $scope.item = item;

    $scope.save = function() {
        $uibModalInstance.close($scope.item);
    };

    $scope.close = function(){
        $uibModalInstance.close(undefined);
    };
}]);
