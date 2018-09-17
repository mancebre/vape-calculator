angular.module('gelApp.my_recipes', []);

angular.module('gelApp.my_recipes').controller('my_recipesCtrl', ['$scope', '$http', 'RecipeService', '$localStorage',
    function ($scope, $http, RecipeService, $localStorage) {

    $scope.maxRating = 5;

    $scope.getAllUserRecipes = function (userId) {

        if ($scope.isLoggedIn()) {

            RecipeService.getMyRecipes(userId, function (status, data) {

                $scope.allUserRecipes = data;

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

    // console.log("User Data", $localStorage.currentUser);

    $scope.getAllUserRecipes($localStorage.currentUser.user_id);

}]);
