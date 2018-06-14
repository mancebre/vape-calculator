(function () {
    'use strict';

    angular
        .module('gelApp')
        .factory('UserRegistration', Service);

    function Service($http, $rootScope) {
        let service = {};

        service.RegisterUser = registerUser;

        return service;

        function registerUser(userData, callback) {
            let apiUrl = $rootScope.apiUrl + 'user/';
            $http.post(apiUrl, {
                email:      userData.email,
                firstname:  userData.firstname,
                lastname:   userData.lastname,
                password:   userData.password,
                username:   userData.username,
                newsletter: userData.newsletter,
            })
                .then(function (response) {

                    callback(response.status);
                })
                .catch(function(response) {
                    console.log('error', response);
                    callback(response.status);
                });
        }
    }
})();