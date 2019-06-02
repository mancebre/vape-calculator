(function () {
    'use strict';

    angular
        .module('gelApp')
        .factory('AuthenticationService', Service);

    function Service($http, $localStorage, $rootScope, $window, MyNotify) {
        let service = {};
        let googleIdToken;

        service.Login = Login;
        service.Logout = Logout;
        service.ActivateAccount = ActivateAccount;
        service.GoogleSignInOptions = GoogleSignInOptions;
        service.VerifyGoogleAccount = VerifyGoogleAccount;

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
                        sortToken(token);

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

        /**
         *
         * @constructor
         */
        function Logout(callback) {
            // remove user from local storage and clear http auth header
            delete $localStorage.currentUser;
            $http.defaults.headers.common.Authorization = '';
            localStorage.removeItem("Token");
            GoogleSignOut();
            
            callback();
        }

        /**
         * Google sign-out
         */
        function GoogleSignOut() {
            var auth2 = gapi.auth2.getAuthInstance();
            auth2.signOut().then(function () {
              console.log('User signed out.');
            });
        }

        function VerifyGoogleAccount(idToken, callback) {
            let apiUrl = $rootScope.apiUrl + 'auth/google_login';
            $http.post(apiUrl, {
                id_token: idToken,
            })
                .then(function (response) {

                    // console.log(response.status);

                    // login successful if there's a token in the response
                    if (response.data.token) {

                        // Get user data from token
                        let token = response.data.token;
                        sortToken(token);

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

        function GoogleSignInOptions() {
            return {
                'onSuccess': function(response) {
                //   let profile = response.getBasicProfile();
                    googleIdToken = response.getAuthResponse().id_token;
                    service.VerifyGoogleAccount(googleIdToken, redirectToHome);
                },
                'onFailure': function(response) {
                    MyNotify.notify(500, "Google sign-in fail. Please refresh page and try again");
                    console.log("GOOGLE SIGN-IN FAIL", response);
                    $rootScope.googleProfile = false;
                }
            }
        }

        function redirectToHome(result, message) {
            if(result === 200) {
                if($rootScope.preLoginRoute) {
                    $window.location.href = $rootScope.preLoginRoute;
                } else {
                    $window.location.href = '/';
                }
            } else {
                MyNotify.notify(500, "Google sign-in fail. Please refresh page and try again");
            }
        }

        function sortToken(token) {
            // Token has 3 parts separated by "."
            // header.payload.signature we need payload
            let tokenArr = token.split(".");
            // Payload is base64 encoded json
            // Let's use "atob" to decode payload
            let userData = angular.fromJson(atob(tokenArr[1]));
            // Store user to local storage
            $localStorage.currentUser = userData;

            // add jwt token to auth header for all requests made by the $http service
            $http.defaults.headers.common.Authorization = 'Token ' + token;
            localStorage.setItem('Token', JSON.stringify('Token ' + token));
        }

        /**
         *
         * @param accountKey
         * @param callback
         * @constructor
         */
        function ActivateAccount(accountKey, callback) {
            let apiUrl = $rootScope.apiUrl + 'activate/' + accountKey;
            $http.get(apiUrl, {})
                .then(function (response) {
                    callback(response.status, response.data);
                })
                .catch(function(response) {
                    console.log('error', response);
                    callback(response.status, response.data);
                });
        }
    }
})();