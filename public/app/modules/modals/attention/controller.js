angular.module('gelApp.openAttention', []);

angular.module('gelApp.openAttention').controller('openAttentionCtrl', ['$scope', '$uibModalInstance', function ($scope, $uibModalInstance) {

    $scope.fix = function(){
        $uibModalInstance.close(true);
    };

    $scope.close = function(){
        $uibModalInstance.close(false);
    };

    //TODO We need some texting here and translations also
}]);
