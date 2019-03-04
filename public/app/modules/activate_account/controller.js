angular.module('gelApp.activateAccount', []);

angular.module('gelApp.activateAccount').controller('activateAccountCtrl', [
    '$rootScope', '$scope', 'AuthenticationService', '$routeParams', '$window',
    function ($rootScope, $scope, AuthenticationService, $routeParams, $window)
    {
        /**
         *
         * @param result
         * @param message
         */
        $scope.doLater = function (result, message) {

            alert(message);

            if (result === 200) {
                $window.location.href = '/login';
            } else {
                $window.location.href = '/';
            }


        };

        let activationKey = $routeParams.activationKey;

        AuthenticationService.ActivateAccount(activationKey, $scope.doLater);
    }
]);
