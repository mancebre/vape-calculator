angular.module('gelApp.forgottenPassword', []);

angular.module('gelApp.forgottenPassword').controller('forgottenPasswordCtrl', [
    '$scope', '$uibModalInstance', 'UserRegistration', 'MyNotify',
    function ($scope, $uibModalInstance, UserRegistration, MyNotify) {

    $scope.email = null;
    $scope.showError = false;

    $scope.close = function(){
        $uibModalInstance.close();
    };

    $scope.runOnServiceEnd = function(status, data) {
        if (status > 0) {
            MyNotify.notify(status, data);
            $scope.showError = false;
            $scope.close();
        } else {
            $scope.showError = true;
        }
    };

    $scope.sendPasswordResetMail = function () {
        console.log($scope.email);
        UserRegistration.ResetPassword($scope.email, $scope.runOnServiceEnd)
    }
}]);
