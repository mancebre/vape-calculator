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
    }
})();