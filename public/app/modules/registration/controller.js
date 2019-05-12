angular.module('gelApp.registration', []);

// TODO 1. Add password strength validator
// TODO 2. Add username suggester, if username is taken suggest them new user name based on entered data

angular.module('gelApp.registration').controller('registrationCtrl', ['$scope', '$window', 'md5', 'UserRegistration', 'MyNotify',
    function ($scope, $window, md5, UserRegistration, MyNotify)
    {
        $scope.step = 1;
        $scope.showError = false;
        $scope.showBadCredentialsMsg = false;
        $scope.showServerMsg = false;
        $scope.serverMessage = false;
        $scope.signupSussesfull = false;

        $scope.emailInUse = false;
        $scope.usernameInUse = false;

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

        $scope.emailCheck = function () {
            if ($scope.registration.email !== undefined && $scope.registration.email.length > 0) {
                console.log("email", $scope.registration.email.length);

                UserRegistration.EmailCheck($scope.registration.email, function (status, data) {
                    $scope.emailInUse = status !== 200;
                })
            }
        };

        $scope.usernameCheck = function () {
            if ($scope.registration.username !== undefined && $scope.registration.username.length > 0) {
                console.log("username", $scope.registration.username.length);

                UserRegistration.UsernameCheck($scope.registration.username, function (status, data) {
                    $scope.usernameInUse = status !== 200;
                })
            }
        };

        $scope.usernameEmailCheck = function (callback) {

            UserRegistration.EmailCheck($scope.registration.email, function (status, data) {
                $scope.emailInUse = status !== 200;

                UserRegistration.UsernameCheck($scope.registration.username, function (status, data) {
                    $scope.usernameInUse = status !== 200;

                    callback();
                })
            })
        };

        $scope.redirectToHome = function (status, message) {

            if (status === 200) {
                $scope.signupSussesfull = true;
            } else {
                $scope.signupSussesfull = false;
                MyNotify.notify(status, message);
            }
        };

        $scope.prepareData = function () {
            $scope.userData = angular.copy($scope.registration);
            delete $scope.userData.confirmPassword;
            // $scope.userData.password = md5.createHash($scope.registration.password);
        };

        $scope.passwordStrength = function () {

            //TextBox left blank.
            if ($scope.registration.password !== undefined && $scope.registration.password.length == 0) {
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
                if (new RegExp(regex[i]).test($scope.registration.password)) {
                    passed++;
                }
            }


            //Validate for length of Password.
            if (passed > 2 && $scope.registration.password.length > 8) {
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

        $scope.next = function () {
            $scope.usernameEmailCheck(function () {
                if ($scope.emailInUse || $scope.usernameInUse) {
                    $scope.step = 1;
                } else {
                    $scope.step++;
                }
            });


        };

        $scope.prev = function () {
            $scope.step--;

            if ($scope.step < 1) {
                $scope.step = 1;
            }
        }
}]);
