angular.module('gelApp.my_recipes', []);

angular.module('gelApp.my_recipes').controller('my_recipesCtrl', ['$scope', '$http', 'RecipeService', '$localStorage',
    function ($scope, $http, RecipeService, $localStorage) {

    // TODO Dummy data, to be deleted when service is created
    $scope.allUserRecipes = [
        {
            id: 1,
            name: "Recipe 1",
            comment: "Lorem ipsum dolor sit amet, detraxit dignissim qui at. Duo ut modus malorum civibus, mel solet reprimique ne. Mea in eius nobis constituam. Cum unum labitur senserit te, dolorum noluisse consequat in ius. Nam ne illum verear, vel in quando utamur, verterem suscipiantur ex sit.",
            rating: 2
        },
        {
            id: 2,
            name: "Recipe 2",
            comment: "Lorem ipsum dolor sit amet, detraxit dignissim qui at. Duo ut modus malorum civibus, mel solet reprimique ne. Mea in eius nobis constituam. Cum unum labitur senserit te, dolorum noluisse consequat in ius. Nam ne illum verear, vel in quando utamur, verterem suscipiantur ex sit.",
            rating: 3
        },
        {
            id: 3,
            name: "Recipe 3",
            comment: "Lorem ipsum dolor sit amet, detraxit dignissim qui at. Duo ut modus malorum civibus, mel solet reprimique ne. Mea in eius nobis constituam. Cum unum labitur senserit te, dolorum noluisse consequat in ius. Nam ne illum verear, vel in quando utamur, verterem suscipiantur ex sit.",
            rating: 5
        },
        {
            id: 4,
            name: "Recipe 4",
            comment: "Lorem ipsum dolor sit amet, detraxit dignissim qui at. Duo ut modus malorum civibus, mel solet reprimique ne. Mea in eius nobis constituam. Cum unum labitur senserit te, dolorum noluisse consequat in ius. Nam ne illum verear, vel in quando utamur, verterem suscipiantur ex sit.",
            rating: 1
        },
        {
            id: 5,
            name: "Recipe 5",
            comment: "Lorem ipsum dolor sit amet, detraxit dignissim qui at. Duo ut modus malorum civibus, mel solet reprimique ne. Mea in eius nobis constituam. Cum unum labitur senserit te, dolorum noluisse consequat in ius. Nam ne illum verear, vel in quando utamur, verterem suscipiantur ex sit.",
            rating: 0
        },
    ];

    $scope.maxRating = 5;

    $scope.getAllUserRecipes = function (userId) {

        if ($scope.isLoggedIn()) {

            RecipeService.getMyRecipes(userId, function (status, data) {

                $scope.allUserRecipes = data;

                console.log({
                    status: status,
                    data:   data
                });

                if(status !== 200) {
                    alert("Something went wrong, please try again.")
                }
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
