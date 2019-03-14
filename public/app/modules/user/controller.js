angular.module('gelApp.user', []);

angular.module('gelApp.user').controller('userCtrl',
    ['$rootScope', '$scope', 'AuthenticationService', '$window', '$localStorage', '$sessionStorage', 'md5', '$uibModal',
    function ($rootScope, $scope, AuthenticationService, $window, $localStorage, $sessionStorage, md5, $uibModal)
    {
        $scope.errorTxt = "Something went wrong. Please try again";
        $scope.showError = false;
        $scope.showBadCredentialsMsg = false;

        $scope.loginCredentials = {
            email: ($localStorage.credentials && $localStorage.credentials.email) ? atob($localStorage.credentials.email) : "",
            password: ($localStorage.credentials && $localStorage.credentials.password) ? atob($localStorage.credentials.password) : "",
            remember: ($localStorage.credentials && $localStorage.credentials.remember) ? atob($localStorage.credentials.remember) : "",
        };

        $scope.loginCredentials.remember = ($scope.loginCredentials.remember === "true");

        $scope.submitLoginForm= function ()
        {
            // AuthenticationService.Login($scope.loginCredentials.email, md5.createHash($scope.loginCredentials.password), $scope.redirectToHome);
            AuthenticationService.Login($scope.loginCredentials.email, $scope.loginCredentials.password, $scope.redirectToHome);
        };

        /**
         * When "remember" is ticked save hashed username and password in local storage.
         * When "remember" is not ticked remove username and password from local storage if there are any.
         */
        $scope.rememberMe = function ()
        {
            if ($scope.loginCredentials.remember) {
                $localStorage.credentials = {
                    email:      btoa($scope.loginCredentials.email),
                    password:   btoa($scope.loginCredentials.password),
                    remember:   btoa($scope.loginCredentials.remember)
                };
            } else {
                delete $localStorage.credentials;
            }

        };

        /**
         *
         * @param result
         */
        $scope.redirectToHome = function (result, message)
        {
            if (result === 200) {
                // Remember the user if he choose so.
                $scope.rememberMe();

                $scope.showError = false;
                $scope.showBadCredentialsMsg = false;
                $window.location.href = '/';
            } else if (result === 404) {
                $scope.showError = false;
                $scope.showBadCredentialsMsg = true;
            } else {
                $scope.showError = true;
                $scope.errorTxt = message;
            }
        };

        $scope.openForgottenPassword = function () {
            $uibModal.open({
                controller: 'forgottenPasswordCtrl',
                templateUrl: 'app/modules/modals/forgotten_password/view.html',
                // backdrop: false
            })
                .result.then(function(){
                console.log("works");
                }, function(res){
                    console.log("ERROR", res);
                }
            );
        }

}]);
