angular.module('gelApp.user', []);

angular.module('gelApp.user').controller('userCtrl', ['$rootScope', '$scope', 'AuthenticationService', '$window', '$localStorage', 'md5',
    function ($rootScope, $scope, AuthenticationService, $window, $localStorage, md5)
    {
        $scope.showError = false;
        $scope.showBadCredentialsMsg = false;

        $scope.loginCredentials = {
            email: "",
            password: "",
            rememberMe: false
        };

        $scope.submitLoginForm= function () {
            AuthenticationService.Login($scope.loginCredentials.email, md5.createHash($scope.loginCredentials.password), $scope.redirectToHome);
        };

        $scope.redirectToHome = function (result) {
            if (result === 200) {
                $scope.showError = false;
                $scope.showBadCredentialsMsg = false;
                $window.location.href = '/';
            } else if (result === 404) {
                $scope.showError = false;
                $scope.showBadCredentialsMsg = true;
            } else {
                $scope.showError = true;
            }
        }

}]);
