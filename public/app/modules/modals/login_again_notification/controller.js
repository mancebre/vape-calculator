angular.module('gelApp.loginAgainNotification', []);

angular.module('gelApp.loginAgainNotification').controller('loginAgainNotificationCtrl', [
    '$scope', '$uibModalInstance', '$timeout',
    function ($scope, $uibModalInstance, $timeout) {

    $scope.close = function(location){
        $uibModalInstance.close(location);
    };
}]);
