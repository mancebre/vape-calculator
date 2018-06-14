angular.module('gelApp.registration', []);

// TODO 0. Add error messages
// TODO 1. Add password strength validator
// TODO 2. Add username suggester, if username is taken suggest them new user name based on entered data

angular.module('gelApp.registration').controller('registrationCtrl', ['$scope', '$window', 'md5', 'UserRegistration',
    function ($scope, $window, md5, UserRegistration)
    {
        $scope.showError = false;
        $scope.showBadCredentialsMsg = false;

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

        $scope.redirectToHome = function (result) {
            if (result === 200) {
                $scope.showError = false;
                $scope.showBadCredentialsMsg = false;
                // $window.location.href = '/';
            } else if (result === 404) {
                $scope.showError = false;
                $scope.showBadCredentialsMsg = true;
            } else {
                $scope.showError = true;
            }
        };

        $scope.prepareData = function () {
            $scope.userData = angular.copy($scope.registration);
            delete $scope.userData.confirmPassword;
            $scope.userData.password = md5.createHash($scope.registration.password);
        }

}]);
