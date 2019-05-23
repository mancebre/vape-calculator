angular.module('gelApp.myAccount', []);

angular.module('gelApp.myAccount').controller('myAccountCtrl',
    ['$rootScope', '$scope', '$uibModal', 'UserRegistration', 'MyNotify', '$localStorage', 'AuthenticationService', '$localStorage', '$location',
    function ($rootScope, $scope, $uibModal, UserRegistration, MyNotify, $localStorage, AuthenticationService, $localStorage, $location)
    {

        // Redirect to login if not logged in
        if(!$localStorage.currentUser) {
            $rootScope.preLoginRoute = $location.url();
            $location.url("/login");
        }

        $scope.userId = $localStorage.currentUser.user_id;
        $scope.emailInUse = null;
        $scope.notificationText = null;

        $scope.userData = {
            username:           $localStorage.currentUser.username,
            email:              $localStorage.currentUser.email,
            re_email:           null,
            firstname:          $localStorage.currentUser.firstname,
            lastname:           $localStorage.currentUser.lastname,
            newsletter:         $localStorage.currentUser.newsletter,
            created_at:         $localStorage.currentUser.created_at,
            updated_at:         $localStorage.currentUser.updated_at,
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
            // console.log("submitUserData", userData);

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
                $scope.notificationText = "LOGIN_LOGOUT_WARNING";
                $scope.openNotification();
            }
        };

        $scope.openNotification = function () {
            $uibModal.open({
                controller: 'loginAgainNotificationCtrl',
                templateUrl: 'app/modules/modals/notification/view.html',
                backdrop: false,
                resolve: {
                    notificationText: function () {
                        return $scope.notificationText;
                    }
                }
            })
                .result.then(function(result){
                    // console.log("works");
                    switch (result) {
                        case "login": {
                            $location.url("/login");
                            break;
                        }
                        case "save_email": {
                            $scope.submitEmail();
                            break;
                        }
                        case "email_saved": {
                            $location.url("/login");
                            break;
                        }
                    }
                }, function(res){
                    console.log("ERROR", res);
                }
            );
        };

        $scope.saveEmail = function() {
            $scope.notificationText = "CHANGE_EMAIL_WARNING";
            $scope.openNotification();
        };

        $scope.submitEmail = function () {
            console.log("submitUserData", $scope.userData.email);
            UserRegistration.UpdateEmail($scope.userData.email, $scope.userId, function (status, data) {
                AuthenticationService.Logout(function () {
                    MyNotify.notify(status, data)
                })
            });

            $scope.notificationText = "CHANGE_EMAIL_NOTIFICATION";
            $scope.openNotification();
        };

        $scope.submitPassword = function () {
            let changePassword = {
                oldPassword:    $scope.userData.currentPassword,
                newPassword:    $scope.userData.password
            };
            console.log("submitUserData", changePassword);

            UserRegistration.UpdatePassword(
                    $scope.userData.currentPassword, 
                    $scope.userData.password, 
                    $scope.userId,
                    MyNotify.notify
                );

            // Update localy stored password if we have it.
            if($localStorage.credentials) {
                $localStorage.credentials.password = btoa($scope.userData.password);
            }
            // Empty input fields.
            $scope.userData.password = null;
            $scope.userData.confirmPassword = null;
            $scope.userData.currentPassword = null;
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
            // console.log($localStorage.currentUser, data);

        };

        UserRegistration.GetUser($scope.userId, $scope.setUser);

}]);
