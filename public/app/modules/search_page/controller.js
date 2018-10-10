angular.module('gelApp.searchPage', []);

angular.module('gelApp.searchPage').controller('searchPageCtrl', ['$scope', '$http', 'RecipeService', '$sessionStorage', 'RatingsService',
    function ($scope, $http, RecipeService, $sessionStorage, RatingsService) {

        $scope.maxRating = 5;
        $scope.resultsLimit = 10;
        $scope.hideLoadMore = false;
        $scope.searchTerm = '';
        $scope.searchFilters = [];
        $scope.allUserRecipes = [];
        $scope.orderBy = [];
        $scope.orderByValues = {
            name:       0,
            comment:    0,
            rated:      0,
            createdBy:  0
        };

        $scope.loadMore = function() {
            $scope.resultsLimit += 10;

            $scope.hideLoadMore = $scope.resultsLimit >= $scope.allUserRecipes.length;
        };

        $scope.search = function () {
            angular.forEach($scope.allUserRecipes, function (recipe) {
                recipe.hide = recipe.name.indexOf($scope.searchTerm) < 0
                    && recipe.createdBy.indexOf($scope.searchTerm) < 0
                    && recipe.comment.indexOf($scope.searchTerm) < 0;
            });

            $scope.resultsLimit = $scope.allUserRecipes.length;
            $scope.hideLoadMore = $scope.resultsLimit >= $scope.allUserRecipes.length;
        };

        $scope.dynamicSort = function(property) {
            if ($scope.orderByValues[property] === 0) {
                $scope.orderByValues[property] = 1;
                // Add to array again
                $scope.orderBy.push(property);
            }
            else if ($scope.orderByValues[property] === 1) {
                $scope.orderByValues[property] = -1;
                // Remove from array
                let index = $scope.orderBy.indexOf(property);
                $scope.orderBy.splice(index, 1);
                // Add to array again
                $scope.orderBy.push('-' + property);
            } else if ($scope.orderByValues[property] === -1) {
                $scope.orderByValues[property] = 0;
                // Remove from array
                let index = $scope.orderBy.indexOf('-' + property);
                $scope.orderBy.splice(index, 1);
            }

            // console.log("orderBy", $scope.orderBy);
            // console.log("orderByValues", $scope.orderByValues);
        };

        $scope.getAllRecipes = function () {
            RecipeService.getAllRecipes(function (status, result) {
                if (status === 200) {
                    $scope.allUserRecipes = result;

                    angular.forEach($scope.allUserRecipes, function (recipe) {

                        let totalRating = 0;
                        let ratersCount = 0;

                        angular.forEach(recipe.rating, function (rating) {
                            totalRating += rating.rating;
                            ratersCount += 1;
                        });

                        recipe.rated = Math.round(totalRating / ratersCount);
                        recipe.rated = recipe.rated ? recipe.rated : 0;

                        recipe.createdBy = recipe.user.username !== undefined ? recipe.user.username: null;
                    });
                }
            })
        };

        $scope.getStarArray = function() {
            var result = [];
            for (var i = 1; i <= $scope.maxRating; i++)
                result.push(i);
            return result;
        };

        $scope.setRating = function (recipe, rating)
        {
            let ratersIds = recipe.rating.map(function (val) {
                return val['user_id'];
            });

            if ($sessionStorage.currentUser !== undefined) {
                // Rate recipe or update rate if user already rated this recipe
                if (ratersIds.indexOf($sessionStorage.currentUser.user_id) === -1) {
                    RatingsService.Rate(recipe.id, rating, function () {
                        $scope.getAllRecipes();
                        alert("Recipe rated successfully.")
                    });
                } else {
                    // My ratings of this recipe.
                    let myRatings = recipe.rating.filter(function (val) {
                        return val.user_id === $sessionStorage.currentUser.user_id;
                    });
                    RatingsService.Update(myRatings[0].id, rating, function () {
                        $scope.getAllRecipes();
                        alert("Recipe updated successfully.")
                    });
                }
            }


        };

        $scope.getAllRecipes();

}]);
