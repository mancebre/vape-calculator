(function () {
    'use strict';

    angular
        .module('gelApp')
        .factory('UserRegistration', Service);

    function Service($http, $rootScope) {
        let service = {};

        service.RegisterUser = registerUser;
        service.EmailCheck = emailCheck;
        service.UsernameCheck = usernameCheck;
        service.ResetPassword = resetPassword;
        service.UpdateUser = updateUser;
        service.GetUser = getUser;
        service.UpdateEmail = updateEmail;
        service.UpdatePassword = updatePassword;
        service.ResendActivation = resendActivation;

        return service;

        function registerUser(userData, callback) {
            let apiUrl = $rootScope.apiUrl + 'user';
            $http.post(apiUrl, {
                email:      userData.email,
                firstname:  userData.firstname,
                lastname:   userData.lastname,
                password:   userData.password,
                username:   userData.username,
                newsletter: userData.newsletter ? 1 : 0,
            })
                .then(function (response) {
                    console.log('success', response);

                    callback(response.status, response.data);
                })
                .catch(function(response) {
                    console.log('error', response);
                    callback(response.status, response.data);
                });
        }

        function updateUser(userId, userData, callback) {
            let apiUrl = $rootScope.apiUrl + 'user/' + userId;
            $http.put(apiUrl, {
                firstname:  userData.firstname,
                lastname:   userData.lastname,
                newsletter: userData.newsletter,
            })
                .then(function (response) {
                    console.log('success', response);

                    callback(response.status, response.data);
                })
                .catch(function(response) {
                    console.log('error', response);
                    callback(response.status, response.data);
                });
        }

        function getUser(userId, callback) {
            let apiUrl = $rootScope.apiUrl + 'user/' + userId;
            $http.get(apiUrl, { params: { userId: userId }})
                .then(function (response) {
                    console.log('success', response);

                    callback(response.status, response.data);
                })
                .catch(function(response) {
                    console.log('error', response);
                    callback(response.status, response.data);
                });
        }

        function emailCheck(email, callback) {
            let apiUrl = $rootScope.apiUrl + 'emailCheck';
            $http.post(apiUrl, {
                email: email
            })
                .then(function (response) {
                    console.log('success', response);

                    callback(response.status, response.data);
                })
                .catch(function(response) {
                    console.log('error', response);
                    callback(response.status, response.data);
                });
        }

        function usernameCheck(username, callback) {
            let apiUrl = $rootScope.apiUrl + 'usernameCheck';
            $http.post(apiUrl, {
                username: username
            })
                .then(function (response) {
                    console.log('success', response);

                    callback(response.status, response.data);
                })
                .catch(function(response) {
                    console.log('error', response);
                    callback(response.status, response.data);
                });
        }

        function resetPassword(email, callback) {
            let apiUrl = $rootScope.apiUrl + 'resetPassword';
            $http.post(apiUrl, {
                email: email
            })
                .then(function (response) {
                    console.log('success', response);

                    callback(response.status, response.data);
                })
                .catch(function(response) {
                    console.log('error', response);
                    callback(response.status, response.data);
                });
        }

        function resendActivation(email, callback) {
            let apiUrl = $rootScope.apiUrl + 'resend_activation';
            $http.put(apiUrl, {
                email: email
            })
                .then(function (response) {
                    console.log('success', response);

                    callback(response.status, response.data);
                })
                .catch(function(response) {
                    console.log('error', response);
                    callback(response.status, response.data);
                });
        }

        function updateEmail(email, userId, callback) {
            let apiUrl = $rootScope.apiUrl + 'email/' + userId;
            $http.put(apiUrl, {
                email:  email,
            })
                .then(function (response) {
                    console.log('success', response);

                    callback(response.status, response.data);
                })
                .catch(function(response) {
                    console.log('error', response);
                    callback(response.status, response.data);
                });
        }

        function updatePassword(oldPass, newPass, userId, callback) {
            let apiUrl = $rootScope.apiUrl + 'password/' + userId;
            $http.put(apiUrl, {
                oldPass:  oldPass,
                newPass:  newPass,
                userId:  userId,
            })
                .then(function (response) {
                    console.log('success', response);

                    callback(response.status, response.data);
                })
                .catch(function(response) {
                    console.log('error', response);
                    callback(response.status, response.data);
                });
        }
    }
})();