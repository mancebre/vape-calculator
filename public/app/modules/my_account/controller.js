angular.module('gelApp.myAccount', []);

angular.module('gelApp.myAccount').controller('myAccountCtrl',
    ['$rootScope', '$scope', '$uibModal', 'UserRegistration', 'MyNotify', '$sessionStorage', 'AuthenticationService', '$localStorage', '$window',
    function ($rootScope, $scope, $uibModal, UserRegistration, MyNotify, $sessionStorage, AuthenticationService, $localStorage, $window)
    {
        $scope.userId = $sessionStorage.currentUser.user_id;
        $scope.emailInUse = null;

        $scope.userData = {
            username:           $sessionStorage.currentUser.username,
            email:              $sessionStorage.currentUser.email,
            re_email:           null,
            firstname:          $sessionStorage.currentUser.firstname,
            lastname:           $sessionStorage.currentUser.lastname,
            newsletter:         $sessionStorage.currentUser.newsletter,
            created_at:         $sessionStorage.currentUser.created_at,
            updated_at:         $sessionStorage.currentUser.updated_at,
            password:           null,
            confirmPassword:    null,
            currentPassword:    null
        };

        $scope.submitUserData = function () {
            let userData = {
                firstname:      $scope.userData.firstname,
                lastname:       $scope.userData.lastname,
                newsletter:     $scope.userData.newsletter,
            };
            console.log("submitUserData", userData);

            UserRegistration.UpdateUser($scope.userId, userData, $scope.refreshToken);
        };

        $scope.refreshToken = function(status, data) {
            MyNotify.notify(status, data);

            if ($localStorage.credentials) {
                AuthenticationService.Login(atob($localStorage.credentials.email), atob($localStorage.credentials.password), function (status) {
                    if (status !== 200) {
                        console.log(status)
                    }
                });
            } else {
                $scope.openLoginAgainNotification();
            }
        };

        $scope.openLoginAgainNotification = function () {
            $uibModal.open({
                controller: 'loginAgainNotificationCtrl',
                templateUrl: 'app/modules/modals/login_again_notification/view.html',
                // backdrop: false
            })
                .result.then(function(location){
                    console.log("works");
                    if (location) {
                        $window.location.href = '/' + location;
                    }
                }, function(res){
                    console.log("ERROR", res);
                }
            );
        };

        $scope.submitEmail = function () {
            console.log("submitUserData", $scope.userData.email);
        };

        $scope.submitPassword = function () {
            let changePassword = {
                oldPassword:    $scope.userData.currentPassword,
                newPassword:    $scope.userData.password
            };
            console.log("submitUserData", changePassword);
        };

        $scope.passwordStrength = function () {

            //TextBox left blank.
            if ($scope.userData.password !== undefined && $scope.userData.password.length == 0) {
                $("#password_strength").html("");
                return;
            }

            //Regular Expressions.
            let regex = [];
            regex.push("[A-Z]"); //Uppercase Alphabet.
            regex.push("[a-z]"); //Lowercase Alphabet.
            regex.push("[0-9]"); //Digit.
            regex.push("[$@$!%*#?&]"); //Special Character.

            let passed = 0;

            //Validate for each Regular Expression.
            for (let i = 0; i < regex.length; i++) {
                if (new RegExp(regex[i]).test($scope.userData.password)) {
                    passed++;
                }
            }


            //Validate for length of Password.
            if (passed > 2 && $scope.userData.password.length > 8) {
                passed++;
            }

            //Display status.
            let color = "";
            let strength = "";
            switch (passed) {
                case 0:
                case 1:
                    strength = "Weak";
                    color = "red";
                    break;
                case 2:
                    strength = "Good";
                    color = "darkorange";
                    break;
                case 3:
                case 4:
                    strength = "Strong";
                    color = "green";
                    break;
                case 5:
                    strength = "Very Strong";
                    color = "darkgreen";
                    break;
            }

            $("#password_strength").html(strength);
            $("#password_strength").css("color", color);
        };

        $scope.emailCheck = function () {
            if ($scope.userData.email !== undefined && $scope.userData.email.length > 0) {

                UserRegistration.EmailCheck($scope.userData.email, function (status, data) {
                    $scope.emailInUse = status !== 200;
                })
            }
        };

        $scope.setUser = function(status, data){
            console.log($sessionStorage.currentUser, data);

        };

        UserRegistration.GetUser($scope.userId, $scope.setUser);

}]);
