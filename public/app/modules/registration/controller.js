angular.module('gelApp.registration', []);

// TODO 0. Add error messages
// TODO 1. Add password strength validator
// TODO 2. Add username suggester, if username is taken suggest them new user name based on entered data

angular.module('gelApp.registration').controller('registrationCtrl', ['$scope', '$window', 'md5', 'UserRegistration', 'MyNotify',
    function ($scope, $window, md5, UserRegistration, MyNotify)
    {
        $scope.showError = false;
        $scope.showBadCredentialsMsg = false;
        $scope.showServerMsg = false;
        $scope.serverMessage = false;
        $scope.signupSussesfull = false;

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

            if (status === 200) {
                $scope.signupSussesfull = true;
            } else {
                $scope.signupSussesfull = false;
                MyNotify.notify(message, status);
            }

            // if (status >= 200 && status < 300) {
            //     $scope.showError = false;
            //     $scope.showBadCredentialsMsg = false;
            //     $scope.showServerMsg = false;
            //     $scope.serverMessage = false;
            //     $scope.signupSussesfull = true;
            // } else if (status === 400) {
            //     $scope.showError = false;
            //     $scope.showBadCredentialsMsg = false;
            //     $scope.showServerMsg = true;
            //     $scope.serverMessage = message;
            //     $scope.signupSussesfull = false;
            // } else if (status === 404) {
            //     $scope.showError = false;
            //     $scope.showBadCredentialsMsg = true;
            //     $scope.showServerMsg = false;
            //     $scope.serverMessage = false;
            //     $scope.signupSussesfull = false;
            // } else {
            //     $scope.showError = true;
            //     $scope.showBadCredentialsMsg = false;
            //     $scope.showServerMsg = true;
            //     $scope.serverMessage = message;
            //     $scope.signupSussesfull = false;
            // }
        };

        $scope.prepareData = function () {
            $scope.userData = angular.copy($scope.registration);
            delete $scope.userData.confirmPassword;
            // $scope.userData.password = md5.createHash($scope.registration.password);
        }

}]);
