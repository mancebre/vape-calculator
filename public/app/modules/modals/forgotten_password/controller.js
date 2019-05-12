angular.module('gelApp.forgottenPassword', []);

angular.module('gelApp.forgottenPassword').controller('forgottenPasswordCtrl', [
    '$scope', '$uibModalInstance', 'UserRegistration', 'MyNotify', 'notificationType',
    function ($scope, $uibModalInstance, UserRegistration, MyNotify, notificationType) {

    $scope.email = null;
    $scope.showError = false;
    $scope.notificationType = notificationType;

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

    $scope.send = function() {
      switch ($scope.notificationType) {
          case "forgotten_password": {
              $scope.sendPasswordResetMail();
              break
          }
          case "resend_activation": {
              $scope.activationLinkResend();
              break;
          }
          default:
              return false;
      }
    };

    $scope.sendPasswordResetMail = function () {
        console.log($scope.email);
        UserRegistration.ResetPassword($scope.email, $scope.runOnServiceEnd)
    };

    $scope.activationLinkResend = function () {
        console.log($scope.email);
        UserRegistration.ResendActivation($scope.email, $scope.runOnServiceEnd)
    }
}]);
