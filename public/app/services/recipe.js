(function () {
    'use strict';

    angular
        .module('gelApp')
        .factory('RecipeService', Service);

    function Service($http, $rootScope) {
        let service = {};

        service.save = save;

        return service;

        function save(recipeData, callback) {
            let apiUrl = $rootScope.apiUrl + 'recipe/';
            $http.post(apiUrl, {
                amount:             recipeData.amount,
                base:               recipeData.base,
                comment:            recipeData.comment,
                desired_strength:   recipeData.desired_strength,
                flavor:             JSON.stringify(recipeData.flavor), // Because python
                nicotine: JSON.stringify({ // Because python
                    strength:   recipeData.nicotine.strength,
                    pg:         recipeData.nicotine.pg,
                    vg:         recipeData.nicotine.vg
                }),
                pg:                 recipeData.pg,
                sleep_time:         recipeData.sleep_time,
                vapeReady:          recipeData.vapeReady ? 1 : 0, // Because python will see it as a string
                vg:                 recipeData.vg,
                wvpga:              recipeData.wvpga
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