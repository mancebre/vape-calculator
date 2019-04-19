angular.module('gelApp.loginAgainNotification', []);

angular.module('gelApp.loginAgainNotification').controller('loginAgainNotificationCtrl', [
    '$scope', 'notificationText', '$uibModalInstance', 'AuthenticationService',
    function ($scope, notificationText, $uibModalInstance, AuthenticationService) {

    console.log(notificationText);
    $scope.notificationText = notificationText;

    $scope.close = function(result){
        $uibModalInstance.close(result);
    };
}]);
