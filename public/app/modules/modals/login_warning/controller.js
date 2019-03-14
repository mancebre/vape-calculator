angular.module('gelApp.loginWarning', []);

angular.module('gelApp.loginWarning').controller('loginWarningCtrl', [
    '$scope', '$uibModalInstance', '$timeout',
    function ($scope, $uibModalInstance, $timeout) {

    $scope.close = function(location){
        $uibModalInstance.close(location);
    };
}]);
