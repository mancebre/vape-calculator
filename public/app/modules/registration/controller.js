angular.module('gelApp.registration', []);

// TODO 0. Add error messages
// TODO 1. Add password strength validator
// TODO 2. Add username suggester, if username is taken suggest them new user name based on entered data

angular.module('gelApp.registration').controller('registrationCtrl', ['$scope', '$window', 'md5', 'UserRegistration',
    function ($scope, $window, md5, UserRegistration)
    {
        $scope.showError = false;
        $scope.showBadCredentialsMsg = false;
        $scope.showServerMsg = false;
        $scope.serverMessage = false;

        $scope.registration = {
            email: "",
            firstname: "",
            lastname: "",
            newsletter: true,
            password: "",
            confirmPassword: "",
            username: "",
        };

        $scope.submitSignupForm= function () {
            $scope.prepareData();
            // console.log($scope.registration);
            // console.log($scope.userData);
            UserRegistration.RegisterUser($scope.userData, $scope.redirectToHome);
        };

        $scope.redirectToHome = function (status, message) {
            if (status === 201) {
                $scope.showError = false;
                $scope.showBadCredentialsMsg = false;
                $scope.showServerMsg = false;
                $scope.serverMessage = false;
                // $window.location.href = '/';
            } else if (status === 400) {
                $scope.showError = false;
                $scope.showBadCredentialsMsg = false;
                $scope.showServerMsg = true;
                $scope.serverMessage = message;
            } else if (status === 404) {
                $scope.showError = false;
                $scope.showBadCredentialsMsg = true;
                $scope.showServerMsg = false;
                $scope.serverMessage = false;
            } else {
                $scope.showError = true;
                $scope.showBadCredentialsMsg = false;
                $scope.showServerMsg = true;
                $scope.serverMessage = message;
            }
        };

        $scope.prepareData = function () {
            $scope.userData = angular.copy($scope.registration);
            delete $scope.userData.confirmPassword;
            $scope.userData.password = md5.createHash($scope.registration.password);
        }

}]);
