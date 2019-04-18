angular.module('gelApp.my_recipes', []);

angular.module('gelApp.my_recipes').controller('my_recipesCtrl', ['$scope', '$http', 'RecipeService', '$sessionStorage', 'RatingsService', 'MyNotify',
    function ($scope, $http, RecipeService, $sessionStorage, RatingsService, MyNotify) {

    $scope.maxRating = 5;

    $scope.getAllUserRecipes = function (userId) {

        if ($scope.isLoggedIn()) {

            RecipeService.getMyRecipes(userId, function (status, data) {

                $scope.allUserRecipes = data;

                angular.forEach($scope.allUserRecipes, function (recipe) {

                    let totalRating = 0;
                    let ratersCount = 0;

                    angular.forEach(recipe.rating, function (rating) {
                        totalRating += parseInt(rating.rating);
                        ratersCount += 1;
                    });

                    recipe.rated = Math.round(totalRating / ratersCount);
                    recipe.rated = recipe.rated ? recipe.rated : 0;
                });

                console.log({
                    status: status,
                    data:   data
                });

                // if(status !== 200) {
                //     alert("Something went wrong, please try again.")
                // }
            });
        } else {
            // Show popup.
            $scope.loginWarning();
        }

    };

    $scope.loginWarning = function(){
        // Open login warning modal
        $uibModal.open({
            controller: 'loginWarningCtrl',
            templateUrl: 'app/modules/modals/login_warning/view.html',
            // backdrop: false
        })
            .result.then(function(location){
                if(location) {
                    console.log("works", location);
                    $window.location.href = '/' + location;
                }
            }, function(res){
                console.log("ERROR", res);
            }
        );
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
            return parseInt(val['user_id']);
        });

        // Rate recipe or update rate if user already rated this recipe
        console.log(ratersIds.indexOf($sessionStorage.currentUser.user_id), ratersIds);
        if (ratersIds.indexOf($sessionStorage.currentUser.user_id) === -1) {
            RatingsService.Rate(recipe.id, rating, function () {
                $scope.getAllUserRecipes($sessionStorage.currentUser.user_id);
                MyNotify.notify(200, "Recipe rated successfully.");
            });
        } else {
            // My ratings of this recipe.
            let myRatings = recipe.rating.filter(function (val) {
                return parseInt(val.user_id) === $sessionStorage.currentUser.user_id;
            });
            RatingsService.Update(myRatings[0].id, rating, function () {
                $scope.getAllUserRecipes($sessionStorage.currentUser.user_id);
                MyNotify.notify(200, "Recipe updated successfully.");
            });
        }

    };

    // console.log("User Data", $sessionStorage.currentUser);

    $scope.getAllUserRecipes($sessionStorage.currentUser.user_id);

}]);
