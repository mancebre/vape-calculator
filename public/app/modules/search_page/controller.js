angular.module('gelApp.searchPage', []);

angular.module('gelApp.searchPage').controller('searchPageCtrl', ['$scope', '$http', 'RecipeService', '$sessionStorage', 'RatingsService',
    function ($scope, $http, RecipeService, $sessionStorage, RatingsService) {

        $scope.maxRating = 5;
        $scope.searchTerm = '';
        $scope.searchFilters = [];
        $scope.allUserRecipes = [
            {
                "id":8,
                "name":"9\/39, 5 mg",
                "amount":840,
                "desired_strength":5,
                "pg":9,"vg":39,
                "nicotine_strength":16,
                "nicotine_pg":52,
                "nicotine_vg":29,
                "wvpga":8,
                "sleep_time":11,
                "vape_ready":1,
                "comment":"Nostrum deserunt rerum saepe tempora dolorem corrupti in rem. Et excepturi quo quod voluptatum voluptates architecto. Qui laborum occaecati facere ea. Totam pariatur vero id natus error iure.",
                "user_id":7,
                "private":0,
                "created_at":"2018-10-09 12:01:42","updated_at":"2018-10-09 12:01:42",
                "rated": 4,
                "recipe_flavors":[
                    {
                        "id":73,
                        "recipe_id":8,
                        "name":"Flavor34",
                        "amount":94,
                        "percentage":78,
                        "type":"vg",
                        "grams":2,
                        "created_at":"2018-10-09 12:01:42","updated_at":"2018-10-09 12:01:42"
                    }
                    ],
                "rating":[
                    {
                        "id":64,
                        "user_id":1,
                        "recipe_id":8,
                        "rating":3,
                        "created_at":"2018-10-09 12:01:45","updated_at":"2018-10-09 12:01:45"
                    },
                    {
                        "id":353,
                        "user_id":4,
                        "recipe_id":8,
                        "rating":3,
                        "created_at":"2018-10-09 12:01:45","updated_at":"2018-10-09 12:01:45"
                    },
                    {
                        "id":443,
                        "user_id":9,
                        "recipe_id":8,
                        "rating":4,
                        "created_at":"2018-10-09 12:01:45","updated_at":"2018-10-09 12:01:45"
                    },
                    {"id":764,"user_id":8,"recipe_id":8,"rating":2,"created_at":"2018-10-09 12:01:46","updated_at":"2018-10-09 12:01:46"},
                    {"id":810,"user_id":7,"recipe_id":8,"rating":1,"created_at":"2018-10-09 12:01:46","updated_at":"2018-10-09 12:10:28"},{"id":978,"user_id":8,"recipe_id":8,"rating":4,"created_at":"2018-10-09 12:01:46","updated_at":"2018-10-09 12:01:46"}]},{"id":10,"name":"100\/19, 15 mg","amount":862,"desired_strength":15,"pg":100,"vg":19,"nicotine_strength":53,"nicotine_pg":79,"nicotine_vg":88,"wvpga":20,"sleep_time":17,"vape_ready":1,"comment":"Itaque qui provident minus incidunt assumenda delectus. Quibusdam rem atque tempore vero. Est impedit id impedit ea. Deleniti ipsum aspernatur nam porro doloribus.","user_id":7,"private":1,"created_at":"2018-10-09 12:01:42","updated_at":"2018-10-09 12:01:42","recipe_flavors":[{"id":15,"recipe_id":10,"name":"Flavor4","amount":30,"percentage":19,"type":"vg","grams":20,"created_at":"2018-10-09 12:01:42","updated_at":"2018-10-09 12:01:42"},{"id":62,"recipe_id":10,"name":"Flavor21","amount":98,"percentage":33,"type":"pg","grams":8,"created_at":"2018-10-09 12:01:42","updated_at":"2018-10-09 12:01:42"}],"rating":[{"id":215,"user_id":5,"recipe_id":10,"rating":1,"created_at":"2018-10-09 12:01:45","updated_at":"2018-10-09 12:01:45"},{"id":272,"user_id":6,"recipe_id":10,"rating":5,"created_at":"2018-10-09 12:01:45","updated_at":"2018-10-09 12:01:45"},{"id":605,"user_id":5,"recipe_id":10,"rating":2,"created_at":"2018-10-09 12:01:45","updated_at":"2018-10-09 12:01:45"},{"id":640,"user_id":9,"recipe_id":10,"rating":3,"created_at":"2018-10-09 12:01:45","updated_at":"2018-10-09 12:01:45"},{"id":652,"user_id":3,"recipe_id":10,"rating":3,"created_at":"2018-10-09 12:01:45","updated_at":"2018-10-09 12:01:45"},{"id":657,"user_id":2,"recipe_id":10,"rating":4,"created_at":"2018-10-09 12:01:45","updated_at":"2018-10-09 12:01:45"},
                    {"id":805,"user_id":4,"recipe_id":10,"rating":1,"created_at":"2018-10-09 12:01:46","updated_at":"2018-10-09 12:01:46"},{"id":958,"user_id":3,"recipe_id":10,"rating":3,"created_at":"2018-10-09 12:01:46","updated_at":"2018-10-09 12:01:46"},{"id":973,"user_id":5,"recipe_id":10,"rating":3,"created_at":"2018-10-09 12:01:46","updated_at":"2018-10-09 12:01:46"}]},{"id":25,"name":"74\/2, 6 mg","amount":190,"desired_strength":6,"pg":74,"vg":2,"nicotine_strength":98,"nicotine_pg":44,"nicotine_vg":26,"wvpga":16,"sleep_time":23,"vape_ready":1,"comment":"Et error est aut amet delectus eum. Alias aut quia et dolor. Saepe autem et voluptatum consequuntur.","user_id":7,"private":1,"created_at":"2018-10-09 12:01:42","updated_at":"2018-10-09 12:01:42","recipe_flavors":[{"id":20,"recipe_id":25,"name":"Flavor14","amount":50,"percentage":12,"type":"pg","grams":19,"created_at":"2018-10-09 12:01:42","updated_at":"2018-10-09 12:01:42"}],"rating":[{"id":9,"user_id":8,"recipe_id":25,"rating":2,"created_at":"2018-10-09 12:01:45","updated_at":"2018-10-09 12:01:45"},{"id":97,"user_id":7,"recipe_id":25,"rating":2,"created_at":"2018-10-09 12:01:45","updated_at":"2018-10-09 12:01:45"},{"id":194,"user_id":6,"recipe_id":25,"rating":4,"created_at":"2018-10-09 12:01:45","updated_at":"2018-10-09 12:01:45"},{"id":357,"user_id":9,"recipe_id":25,"rating":1,"created_at":"2018-10-09 12:01:45","updated_at":"2018-10-09 12:01:45"},{"id":672,"user_id":4,"recipe_id":25,"rating":5,"created_at":"2018-10-09 12:01:45","updated_at":"2018-10-09 12:01:45"},{"id":686,"user_id":1,"recipe_id":25,"rating":1,"created_at":"2018-10-09 12:01:45","updated_at":"2018-10-09 12:01:45"},{"id":992,"user_id":10,"recipe_id":25,"rating":4,"created_at":"2018-10-09 12:01:46","updated_at":"2018-10-09 12:01:46"}]},{"id":44,"name":"50\/28, 4 mg","amount":905,"desired_strength":4,"pg":50,"vg":28,"nicotine_strength":76,"nicotine_pg":55,"nicotine_vg":46,"wvpga":6,"sleep_time":37,"vape_ready":0,"comment":"Dolores cumque rerum quam odio sit amet occaecati. Aut omnis reprehenderit maiores eligendi et nisi. Magni aut sequi est praesentium saepe officia.","user_id":7,"private":0,"created_at":"2018-10-09 12:01:42","updated_at":"2018-10-09 12:01:42","recipe_flavors":[{"id":75,"recipe_id":44,"name":"Flavor43","amount":34,"percentage":42,"type":"vg","grams":11,"created_at":"2018-10-09 12:01:42","updated_at":"2018-10-09 12:01:42"}],"rating":[{"id":49,"user_id":3,"recipe_id":44,"rating":2,"created_at":"2018-10-09 12:01:45","updated_at":"2018-10-09 12:01:45"},{"id":450,"user_id":5,"recipe_id":44,"rating":1,"created_at":"2018-10-09 12:01:45","updated_at":"2018-10-09 12:01:45"},{"id":505,"user_id":2,"recipe_id":44,"rating":3,"created_at":"2018-10-09 12:01:45","updated_at":"2018-10-09 12:01:45"},{"id":673,"user_id":8,"recipe_id":44,"rating":3,"created_at":"2018-10-09 12:01:45","updated_at":"2018-10-09 12:01:45"},
                    {"id":848,"user_id":9,"recipe_id":44,"rating":2,"created_at":"2018-10-09 12:01:46","updated_at":"2018-10-09 12:01:46"},{"id":849,"user_id":7,"recipe_id":44,"rating":5,"created_at":"2018-10-09 12:01:46","updated_at":"2018-10-09 12:01:46"},{"id":936,"user_id":7,"recipe_id":44,"rating":2,"created_at":"2018-10-09 12:01:46","updated_at":"2018-10-09 12:01:46"},{"id":937,"user_id":6,"recipe_id":44,"rating":3,"created_at":"2018-10-09 12:01:46","updated_at":"2018-10-09 12:01:46"},{"id":951,"user_id":4,"recipe_id":44,"rating":4,"created_at":"2018-10-09 12:01:46","updated_at":"2018-10-09 12:01:46"},{"id":980,"user_id":2,"recipe_id":44,"rating":1,"created_at":"2018-10-09 12:01:46","updated_at":"2018-10-09 12:01:46"},{"id":999,"user_id":5,"recipe_id":44,"rating":5,"created_at":"2018-10-09 12:01:46","updated_at":"2018-10-09 12:01:46"}]},{"id":47,"name":"31\/82, 14 mg","amount":555,"desired_strength":14,"pg":31,"vg":82,"nicotine_strength":89,"nicotine_pg":37,"nicotine_vg":18,"wvpga":11,"sleep_time":20,"vape_ready":0,"comment":"Et eum commodi deleniti sequi aspernatur accusamus maxime quis. Praesentium ratione qui enim eligendi.","user_id":7,"private":1,"created_at":"2018-10-09 12:01:42","updated_at":"2018-10-09 12:01:42","recipe_flavors":[{"id":21,"recipe_id":47,"name":"Flavor1","amount":50,"percentage":37,"type":"pg","grams":24,"created_at":"2018-10-09 12:01:42","updated_at":"2018-10-09 12:01:42"}],"rating":[{"id":289,"user_id":5,"recipe_id":47,"rating":2,"created_at":"2018-10-09 12:01:45","updated_at":"2018-10-09 12:01:45"},{"id":523,"user_id":8,"recipe_id":47,"rating":3,"created_at":"2018-10-09 12:01:45","updated_at":"2018-10-09 12:01:45"},{"id":546,"user_id":6,"recipe_id":47,"rating":4,"created_at":"2018-10-09 12:01:45","updated_at":"2018-10-09 12:01:45"},{"id":568,"user_id":9,"recipe_id":47,"rating":5,"created_at":"2018-10-09 12:01:45","updated_at":"2018-10-09 12:01:45"},{"id":629,"user_id":8,"recipe_id":47,"rating":4,"created_at":"2018-10-09 12:01:45","updated_at":"2018-10-09 12:01:45"},{"id":636,"user_id":7,"recipe_id":47,"rating":5,"created_at":"2018-10-09 12:01:45","updated_at":"2018-10-09 12:01:45"},{"id":649,"user_id":9,"recipe_id":47,"rating":5,"created_at":"2018-10-09 12:01:45","updated_at":"2018-10-09 12:01:45"},{"id":912,"user_id":4,"recipe_id":47,"rating":2,"created_at":"2018-10-09 12:01:46","updated_at":"2018-10-09 12:01:46"},{"id":949,"user_id":7,"recipe_id":47,"rating":5,"created_at":"2018-10-09 12:01:46","updated_at":"2018-10-09 12:01:46"},{"id":962,"user_id":4,"recipe_id":47,"rating":4,"created_at":"2018-10-09 12:01:46","updated_at":"2018-10-09 12:01:46"}]},{"id":48,"name":"40\/11, 15 mg","amount":480,"desired_strength":15,"pg":40,"vg":11,"nicotine_strength":64,"nicotine_pg":47,"nicotine_vg":88,"wvpga":10,"sleep_time":32,"vape_ready":0,"comment":"At ut molestiae eius omnis officiis. Nam sunt ut quis beatae.","user_id":7,"private":1,"created_at":"2018-10-09 12:01:42","updated_at":"2018-10-09 12:01:42","recipe_flavors":[{"id":60,"recipe_id":48,"name":"Flavor16","amount":84,"percentage":26,"type":"vg","grams":24,"created_at":"2018-10-09 12:01:42","updated_at":"2018-10-09 12:01:42"}],"rating":[{"id":40,"user_id":6,"recipe_id":48,"rating":3,"created_at":"2018-10-09 12:01:45","updated_at":"2018-10-09 12:01:45"},{"id":57,"user_id":4,"recipe_id":48,"rating":5,"created_at":"2018-10-09 12:01:45","updated_at":"2018-10-09 12:01:45"},{"id":164,"user_id":10,"recipe_id":48,"rating":2,"created_at":"2018-10-09 12:01:45","updated_at":"2018-10-09 12:01:45"},{"id":299,"user_id":7,"recipe_id":48,"rating":2,"created_at":"2018-10-09 12:01:45","updated_at":"2018-10-09 12:01:45"},{"id":317,"user_id":9,"recipe_id":48,"rating":1,"created_at":"2018-10-09 12:01:45","updated_at":"2018-10-09 12:01:45"},{"id":372,"user_id":8,"recipe_id":48,"rating":3,"created_at":"2018-10-09 12:01:45","updated_at":"2018-10-09 12:01:45"},{"id":379,"user_id":10,"recipe_id":48,"rating":3,"created_at":"2018-10-09 12:01:45","updated_at":"2018-10-09 12:01:45"},{"id":500,"user_id":5,"recipe_id":48,"rating":4,"created_at":"2018-10-09 12:01:45","updated_at":"2018-10-09 12:01:45"},{"id":530,"user_id":9,"recipe_id":48,"rating":1,"created_at":"2018-10-09 12:01:45","updated_at":"2018-10-09 12:01:45"},{"id":746,"user_id":7,"recipe_id":48,"rating":5,"created_at":"2018-10-09 12:01:46","updated_at":"2018-10-09 12:01:46"},
                    {"id":855,"user_id":6,"recipe_id":48,"rating":3,"created_at":"2018-10-09 12:01:46","updated_at":"2018-10-09 12:01:46"}]},{"id":53,"name":"67\/11, 16 mg","amount":823,"desired_strength":16,"pg":67,"vg":11,"nicotine_strength":13,"nicotine_pg":96,"nicotine_vg":86,"wvpga":7,"sleep_time":3,"vape_ready":1,"comment":"Eaque beatae quisquam unde qui sint nihil reprehenderit. Alias hic doloremque quis laboriosam occaecati fuga. Est autem voluptatum doloremque eligendi fugit quaerat accusamus consequatur.","user_id":7,"private":1,"created_at":"2018-10-09 12:01:42","updated_at":"2018-10-09 12:01:42","recipe_flavors":[{"id":89,"recipe_id":53,"name":"Flavor3","amount":23,"percentage":6,"type":"pg","grams":1,"created_at":"2018-10-09 12:01:42","updated_at":"2018-10-09 12:01:42"}],"rating":[{"id":29,"user_id":2,"recipe_id":53,"rating":5,"created_at":"2018-10-09 12:01:45","updated_at":"2018-10-09 12:01:45"},{"id":207,"user_id":9,"recipe_id":53,"rating":2,"created_at":"2018-10-09 12:01:45","updated_at":"2018-10-09 12:01:45"},{"id":217,"user_id":7,"recipe_id":53,"rating":3,"created_at":"2018-10-09 12:01:45","updated_at":"2018-10-09 12:01:45"},{"id":243,"user_id":6,"recipe_id":53,"rating":4,"created_at":"2018-10-09 12:01:45","updated_at":"2018-10-09 12:01:45"},{"id":396,"user_id":7,"recipe_id":53,"rating":1,"created_at":"2018-10-09 12:01:45","updated_at":"2018-10-09 12:01:45"},{"id":578,"user_id":7,"recipe_id":53,"rating":2,"created_at":"2018-10-09 12:01:45","updated_at":"2018-10-09 12:01:45"},{"id":585,"user_id":1,"recipe_id":53,"rating":3,"created_at":"2018-10-09 12:01:45","updated_at":"2018-10-09 12:01:45"},{"id":654,"user_id":2,"recipe_id":53,"rating":3,"created_at":"2018-10-09 12:01:45","updated_at":"2018-10-09 12:01:45"},{"id":666,"user_id":3,"recipe_id":53,"rating":4,"created_at":"2018-10-09 12:01:45","updated_at":"2018-10-09 12:01:45"},{"id":688,"user_id":2,"recipe_id":53,"rating":1,"created_at":"2018-10-09 12:01:45","updated_at":"2018-10-09 12:01:45"},{"id":827,"user_id":10,"recipe_id":53,"rating":4,"created_at":"2018-10-09 12:01:46","updated_at":"2018-10-09 12:01:46"},{"id":856,"user_id":6,"recipe_id":53,"rating":3,"created_at":"2018-10-09 12:01:46","updated_at":"2018-10-09 12:01:46"}]},{"id":63,"name":"43\/92, 20 mg","amount":504,"desired_strength":20,"pg":43,"vg":92,"nicotine_strength":3,"nicotine_pg":32,"nicotine_vg":75,"wvpga":12,"sleep_time":36,"vape_ready":0,"comment":"In sit corrupti cupiditate soluta ea. Iusto et sapiente maxime. Aliquid repellat est delectus omnis earum consequatur quam.","user_id":7,"private":1,"created_at":"2018-10-09 12:01:42","updated_at":"2018-10-09 12:01:42","recipe_flavors":[{"id":44,"recipe_id":63,"name":"Flavor10","amount":67,"percentage":60,"type":"pg","grams":3,"created_at":"2018-10-09 12:01:42","updated_at":"2018-10-09 12:01:42"},{"id":58,"recipe_id":63,"name":"Flavor29","amount":83,"percentage":81,"type":"vg","grams":14,"created_at":"2018-10-09 12:01:42","updated_at":"2018-10-09 12:01:42"}],"rating":[{"id":449,"user_id":10,"recipe_id":63,"rating":2,"created_at":"2018-10-09 12:01:45","updated_at":"2018-10-09 12:01:45"},{"id":556,"user_id":10,"recipe_id":63,"rating":1,"created_at":"2018-10-09 12:01:45","updated_at":"2018-10-09 12:01:45"},{"id":570,"user_id":8,"recipe_id":63,"rating":2,"created_at":"2018-10-09 12:01:45","updated_at":"2018-10-09 12:01:45"},{"id":617,"user_id":4,"recipe_id":63,"rating":2,"created_at":"2018-10-09 12:01:45","updated_at":"2018-10-09 12:01:45"},{"id":712,"user_id":7,"recipe_id":63,"rating":1,"created_at":"2018-10-09 12:01:46","updated_at":"2018-10-09 12:12:21"},{"id":781,"user_id":1,"recipe_id":63,"rating":1,"created_at":"2018-10-09 12:01:46","updated_at":"2018-10-09 12:01:46"},{"id":941,"user_id":4,"recipe_id":63,"rating":2,"created_at":"2018-10-09 12:01:46","updated_at":"2018-10-09 12:01:46"},{"id":985,"user_id":8,"recipe_id":63,"rating":2,"created_at":"2018-10-09 12:01:46","updated_at":"2018-10-09 12:01:46"}]},{"id":80,"name":"Flavor28, 53\/47, 14 mg","amount":421,"desired_strength":14,"pg":53,"vg":47,"nicotine_strength":95,"nicotine_pg":35,"nicotine_vg":6,"wvpga":5,"sleep_time":3,"vape_ready":0,"comment":"Rerum corrupti porro doloribus. Consectetur reprehenderit qui sed aliquam. Voluptatem ipsa fugiat animi ipsam temporibus quibusdam totam et. Nulla ullam assumenda assumenda repellat.","user_id":7,"private":0,"created_at":"2018-10-09 12:01:42","updated_at":"2018-10-09 12:05:08","recipe_flavors":[{"id":97,"recipe_id":80,"name":"Flavor28","amount":95,"percentage":4,"type":"vg","grams":13,"created_at":"2018-10-09 12:01:42","updated_at":"2018-10-09 12:05:08"}],"rating":[{"id":15,"user_id":4,"recipe_id":80,"rating":1,"created_at":"2018-10-09 12:01:45","updated_at":"2018-10-09 12:01:45"},{"id":94,"user_id":4,"recipe_id":80,"rating":4,"created_at":"2018-10-09 12:01:45","updated_at":"2018-10-09 12:01:45"},{"id":120,"user_id":4,"recipe_id":80,"rating":5,"created_at":"2018-10-09 12:01:45","updated_at":"2018-10-09 12:01:45"},{"id":691,"user_id":8,"recipe_id":80,"rating":1,"created_at":"2018-10-09 12:01:45","updated_at":"2018-10-09 12:01:45"},{"id":778,"user_id":5,"recipe_id":80,"rating":4,"created_at":"2018-10-09 12:01:46","updated_at":"2018-10-09 12:01:46"},{"id":932,"user_id":10,"recipe_id":80,"rating":4,"created_at":"2018-10-09 12:01:46","updated_at":"2018-10-09 12:01:46"},{"id":1001,"user_id":7,"recipe_id":80,"rating":1,"created_at":"2018-10-09 12:05:13","updated_at":"2018-10-09 12:05:13"}]}];

        $scope.search = function () {
            console.log($scope.searchTerm);
        };

        $scope.getAllRecipes = function () {
            RecipeService.getAllRecipes(function (status, result) {
                if (status === 200) {
                    $scope.allUserRecipes = result;
                    console.log("RESULT", result);
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

            // Rate recipe or update rate if user already rated this recipe
            if (ratersIds.indexOf($sessionStorage.currentUser.user_id) === -1) {
                RatingsService.Rate(recipe.id, rating, function () {
                    $scope.getAllUserRecipes($sessionStorage.currentUser.user_id);
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

        };

        $scope.getAllRecipes();

}]);
