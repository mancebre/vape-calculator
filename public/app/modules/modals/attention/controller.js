angular.module('gelApp.openAttention', []);

angular.module('gelApp.openAttention').controller('openAttentionCtrl', ['$scope', '$uibModalInstance', function ($scope, $uibModalInstance) {

    $scope.close = function(){
        $uibModalInstance.close(undefined);
    };
}]);
