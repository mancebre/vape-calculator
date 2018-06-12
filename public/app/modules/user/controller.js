angular.module('gelApp.user', []);

angular.module('gelApp.user').controller('userCtrl', ['$rootScope', '$scope', 'AuthenticationService', '$window', '$localStorage', 'md5',
    function ($rootScope, $scope, AuthenticationService, $window, $localStorage, md5)
    {

        $scope.loginCredentials = {
            email: "",
            password: "",
            rememberMe: false
        };

        $scope.submitLoginForm= function () {

            AuthenticationService.Login($scope.loginCredentials.email, md5.createHash($scope.loginCredentials.password), $scope.redirectToHome);

        };

        $scope.redirectToHome = function () {
            // $window.location.href = '/';
            console.log("Local user", $localStorage.currentUser);
        }

}]);
