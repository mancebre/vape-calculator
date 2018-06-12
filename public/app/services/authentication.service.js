(function () {
    'use strict';

    angular
        .module('gelApp')
        .factory('AuthenticationService', Service);

    function Service($http, $localStorage) {
        let service = {};

        service.Login = Login;
        service.Logout = Logout;

        return service;

        function Login(email, password, callback) {
            $http.post('/api/authenticate', { email: email, password: password })
                .then(function successCallback(response) {
                    // login successful if there's a token in the response
                    if (response.token) {
                        console.log({
                            "token":    response.token,
                            userData:   response.userData
                        });
                        // store email and token in local storage to keep user logged in between page refreshes
                        $localStorage.currentUser = { email: email, token: response.token };

                        // add jwt token to auth header for all requests made by the $http service
                        $http.defaults.headers.common.Authorization = 'Bearer ' + response.token;

                        // execute callback with true to indicate successful login
                        callback(true);
                    } else {
                        // execute callback with false to indicate failed login
                        callback(false);
                    }
                }, function errorCallback(response) {
                    console.log("ERROR", response)
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                });
        }

        function Logout() {
            // remove user from local storage and clear http auth header
            delete $localStorage.currentUser;
            $http.defaults.headers.common.Authorization = '';
        }
    }
})();