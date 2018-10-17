(function () {
    'use strict';

    angular
        .module('gelApp')
        .factory('RecipeService', Service);

    function Service($http, $rootScope) {
        let service = {};

        service.save = save;
        service.getMyRecipes = getMyRecipes;
        service.getRecipe = getRecipe;
        service.deleteRecipe = deleteRecipe;
        service.getAllRecipes = getAllRecipes;

        return service;

        function save(recipeData, callback) {
            console.log("Token", $http.defaults.headers.common.Authorization);
            let apiUrl = $rootScope.apiUrl + 'recipe/';
            if(recipeData.id) {
                $http.put(apiUrl + recipeData.id, {
                        name:               recipeData.name,
                        amount:             recipeData.amount,
                        base:               recipeData.base,
                        comment:            recipeData.comment,
                        desired_strength:   recipeData.desired_strength,
                        flavor:             JSON.stringify(recipeData.flavor), // Because python
                        nicotine:           JSON.stringify({ // Because python
                            strength:   recipeData.nicotine.strength,
                            pg:         recipeData.nicotine.pg,
                            vg:         recipeData.nicotine.vg
                        }),
                        pg:                 recipeData.pg,
                        sleep_time:         recipeData.sleep_time,
                        vapeReady:          recipeData.vapeReady,
                        vg:                 recipeData.vg,
                        wvpga:              recipeData.wvpga,
                        private:            recipeData.private
                    },
                    // { headers:{ 'Authorization':  'Token ' + 123456} }
                )
                    .then(function (response) {
                        console.log('success', response);

                        callback(response.status, response.data);
                    })
                    .catch(function(response) {
                        console.log('error', response);
                        callback(response.status, response.data);
                    });
            } else {
                $http.post(apiUrl, {
                        name:               recipeData.name,
                        amount:             recipeData.amount,
                        base:               recipeData.base,
                        comment:            recipeData.comment,
                        desired_strength:   recipeData.desired_strength,
                        flavor:             JSON.stringify(recipeData.flavor), // Because python
                        nicotine:           JSON.stringify({ // Because python
                            strength:   recipeData.nicotine.strength,
                            pg:         recipeData.nicotine.pg,
                            vg:         recipeData.nicotine.vg
                        }),
                        pg:                 recipeData.pg,
                        sleep_time:         recipeData.sleep_time,
                        vapeReady:          recipeData.vapeReady,
                        vg:                 recipeData.vg,
                        wvpga:              recipeData.wvpga,
                        private:            recipeData.private
                    },
                    // { headers:{ 'Authorization':  'Token ' + 123456} }
                )
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

        function getMyRecipes(userId, callback) {
            let apiUrl = $rootScope.apiUrl + 'myRecipes/';
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

        function getRecipe(id, callback) {
            let apiUrl = $rootScope.apiUrl + 'recipe/' + id;
            $http.get(apiUrl, {})
                .then(function (response) {
                    console.log('success', response);

                    callback(response.status, response.data);
                })
                .catch(function(response) {
                    console.log('error', response);
                    callback(response.status, response.data);
                });
        }

        function deleteRecipe(id, callback) {
            let apiUrl = $rootScope.apiUrl + 'recipe/' + id;
            $http.delete(apiUrl, {})
                .then(function (response) {
                    console.log('success', response);

                    callback(response.status, response.data);
                })
                .catch(function(response) {
                    console.log('error', response);
                    callback(response.status, response.data);
                });
        }

        /**
         * Get all public recipes.
         */
        function getAllRecipes(callback) {
            let apiUrl = $rootScope.apiUrl + 'getAllRecipes/';
            let params = {};
            $http.get(apiUrl, {params})
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