(function () {
    'use strict';

    angular
        .module('gelApp')
        .factory('AuthenticationService', Service);

    function Service($http, $localStorage, $rootScope) {
        let service = {};

        service.Login = Login;
        service.Logout = Logout;

        return service;

        function Login(email, password, callback) {
            let apiUrl = $rootScope.apiUrl + 'user/0';
            $http.get(apiUrl, { params: { email: email, password: password } })
                .then(function (response) {

                    // login successful if there's a token in the response
                    if (response.data.token) {

                        let token = response.data.token;
                        let userData = response.data.userData;
                        // store email and token in local storage to keep user logged in between page refreshes
                        $localStorage.currentUser = { userData: userData, token: token };

                        // add jwt token to auth header for all requests made by the $http service
                        $http.defaults.headers.common.Authorization = 'Token ' + token;

                        // execute callback with true to indicate successful login
                        callback(true);
                    } else {
                        // execute callback with false to indicate failed login
                        callback(false);
                    }
                }).catch(function(response) {
                console.log('error', response);
            });
        }

        function Logout() {
            // remove user from local storage and clear http auth header
            delete $localStorage.currentUser;
            $http.defaults.headers.common.Authorization = '';
        }
    }
})();