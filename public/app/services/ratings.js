(function () {
    'use strict';

    angular
        .module('gelApp')
        .factory('RatingsService', Service);

    function Service($http, $rootScope) {
        let service = {};

        service.Rate = rate;
        service.Update = update;

        return service;

        function rate(recipeId, rating, callback) {
            let apiUrl = $rootScope.apiUrl + 'rating';
            $http.post(apiUrl, {
                recipe_id:  recipeId,
                rating:     rating,
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
        
        function update(id, rating, callback) {
            let apiUrl = $rootScope.apiUrl + 'rating/' + id;
            $http.put(apiUrl, {
                rating:     rating,
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