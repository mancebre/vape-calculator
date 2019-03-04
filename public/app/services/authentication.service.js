(function () {
    'use strict';

    angular
        .module('gelApp')
        .factory('AuthenticationService', Service);

    function Service($http, $sessionStorage, $rootScope) {
        let service = {};

        service.Login = Login;
        service.Logout = Logout;

        return service;

        /**
         * Returns http status of a request
         * @param email
         * @param password
         * @param callback
         * @constructor
         */
        function Login(email, password, callback) {
            let apiUrl = $rootScope.apiUrl + 'auth/login';
            $http.post(apiUrl, {
                email: email,
                password: password
            })
                .then(function (response) {

                    // console.log(response.status);

                    // login successful if there's a token in the response
                    if (response.data.token) {

                        // Get user data from token
                        let token = response.data.token;
                        // Token has 3 parts separated by "."
                        // header.payload.signature we need payload
                        let tokenArr = token.split(".");
                        // Payload is base64 encoded json
                        // Let's use "atob" to decode payload
                        let userData = angular.fromJson(atob(tokenArr[1]));
                        // Store user to local storage
                        $sessionStorage.currentUser = userData;

                        // add jwt token to auth header for all requests made by the $http service
                        $http.defaults.headers.common.Authorization = 'Token ' + token;
                        sessionStorage.setItem('Token', JSON.stringify('Token ' + token));

                        // execute callback with true to indicate successful login
                        callback(response.status);
                    } else {
                        // execute callback with false to indicate failed login
                        callback(response.status);
                    }
                })
                .catch(function(response) {
                    console.log('error', response);
                    callback(response.status, response.data);
            });
        }

        function Logout() {
            // remove user from local storage and clear http auth header
            delete $sessionStorage.currentUser;
            $http.defaults.headers.common.Authorization = '';
            sessionStorage.removeItem("Token");
        }
    }
})();