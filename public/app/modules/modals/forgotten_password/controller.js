angular.module('gelApp.forgottenPassword', []);

angular.module('gelApp.forgottenPassword').controller('forgottenPasswordCtrl', [
    '$scope', '$uibModalInstance', '$timeout',
    function ($scope, $uibModalInstance, $timeout) {

    $scope.save = function() {
        $uibModalInstance.close();
    };

    $scope.close = function(){
        $uibModalInstance.close(undefined);
    };
}]);
