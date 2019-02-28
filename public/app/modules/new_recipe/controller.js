angular.module('gelApp.newRecipe', []);

angular.module('gelApp.newRecipe').controller('newRecipeCtrl', ['$scope', '$http', '$translate', '$uibModal', 'tooltipTranslations', '$rootScope', '$location', 'RecipeService', '$routeParams', '$timeout', '$sessionStorage', 'MyNotify',
    function ($scope, $http, $translate, $uibModal, tooltipTranslations, $rootScope, $location, RecipeService, $routeParams, $timeout, $sessionStorage, MyNotify) {

        $scope.duplicateFlavorNames = false;
        $scope.disableSave = true;

        // This is true when attention popup is open.
        $scope.attentionPopup = false;
        $scope.history = [];

        $scope.translateTootips = function () {
            $scope.tt = tooltipTranslations[$rootScope.selectedLang];
        };

        // How many grams there is in 1 ml
        if(sessionStorage.getItem('weights') !== null) {
            $scope.weights = JSON.parse(sessionStorage.getItem('weights'));
        } else {
            // Default values
            $scope.weights = {
                pg: 1.04,
                vg: 1.26,
                flavor: 1.04,
                diluent: 1
            };
            sessionStorage.setItem('weights', JSON.stringify($scope.weights));
        }

        $scope.loginWarning = function(){
            // Open login warning modal
            $uibModal.open({
                controller: 'loginWarningCtrl',
                templateUrl: 'app/modules/modals/login_warning/view.html',
                // backdrop: false
            })
                .result.then(function(location){
                    if(location) {
                        // console.log("works", location);
                        $location.url('/' + location);
                    }
                }, function(res){
                    console.log("ERROR", res);
                }
            );
        };

        $scope.editWeight = function(){
            // Open modal to edit weights
            $uibModal.open({
                controller: 'editWeightsCtrl',
                templateUrl: 'app/modules/modals/weight/view.html',
                backdrop: false,
                resolve: {
                    item: function () {
                        return $scope.weights;
                    }
                }
            })
                .result.then(function(result){
                    if(result) {
                        $scope.weights = result;
                    }
                }, function(res){
                    console.log(res);
                }
            );
        };

        /**
         * Opens "bad calculation" attention modal.
         */
        $scope.openAttention = function() {
            if(!$scope.attentionPopup) {
                $scope.attentionPopup = true;
                $uibModal.open({
                    controller: 'openAttentionCtrl',
                    templateUrl: 'app/modules/modals/attention/view.html',
                    backdrop: false
                })
                    .result.then(function (result) {
                        $scope.attentionPopup = false;
                        // if "revert" is clicked.
                        if(result) {
                            let tempLiquid = $scope.history.pop().liquid;
                            $scope.liquid = tempLiquid;

                        }
                    }, function (res) {
                        console.log(res);
                    }
                );
            }
        };

        $scope.originalLiquid = {
            id:                 false,
            name:               "",
            amount:             100,
            desired_strength:   6,
            wvpga:              0,
            pg:                 30,
            vg:                 70,
            nicotine: {
                strength:   100,
                pg:         100,
                vg:         0
            },
            base:               0,
            flavor:             [],
            sleep_time:         7,
            comment:            ""

        };

        // Ingredients to be calculated
        $scope.ingridients = {
            base:           {
                ml:         0,
                gr:         0,
                percentage: 0
            },
            nicotine_juice: {
                ml:         0,
                gr:         0,
                percentage: 0
            },
            pg_dilutant:    {
                ml:         0,
                gr:         0,
                percentage: 0
            },
            vg_dilutant:    {
                ml:         0,
                gr:         0,
                percentage: 0
            },
            wvpga:          {
                ml:         0,
                gr:         0,
                percentage: 0
            },
            flavor:         [],
            amount:         {
                ml:         0,
                gr:         0,
                percentage: 0
            }
        };

        // Nice names for ingredients
        $scope.niceNames ={
            nicotine_juice: "Nicotine",
            pg_dilutant:    "PG",
            vg_dilutant:    "VG",
            wvpga:          "Dilutant",
            base:           "Base",
            amount:       "Total amount"
        };

        $scope.flavorsCount = 0;
        $scope.flavorFields = [];
        // Use vape-ready nicotine base
        $scope.vapeReady = false;
        $scope.private = false;

        $scope.addField = function(){
            $scope.flavorFields.push($scope.flavorsCount);
            $scope.liquid.flavor[$scope.flavorsCount] = {
                percentage: 0,
                amount:     0,
                grams:      0,
                type:       'pg',
                name:       'Flavor ' + ($scope.flavorsCount + 1)
            };
            $scope.flavorsCount++
        };

        $scope.removeField = function (id, value) {
            $scope.flavorFields.splice(id, 1);
            $scope.ingridients.flavor.splice(id, 1);
            $scope.liquid.flavor.splice(id, 1);
            $scope.flavorsCount--
        };

        $scope.openWeightSettings = function() {

        };

        //4. copy originalLiquid to liquid. liquid will be bind to a form
        $scope.liquid = angular.copy($scope.originalLiquid);

        // Slider options
        $scope.slider = {
            value: $scope.liquid.pg,
            options: {
                floor: 0,
                ceil: 100
            }
        };

        // Limited slider options
        $scope.limitedSlider = {
            options: {
                floor: 0,
                ceil: 35,
                maxLimit: 35
            }
        };

        $scope.checkIfFlavorNameExists = function(arr, newName) {
            return arr.some(function(e) {
                return e.name === newName;
            });
        };

        //5. create submitStudentForm() function. This will be called when user submits the form
        $scope.submitLiquidForm = function (clone) {

            if ($scope.duplicateFlavorNames) {
                MyNotify.notify("You have duplicate flavor names, please change one of duplicated flavor names...", 400);
            } else {
                // TODO This data should be parsed in one level object.
                $scope.liquid.vapeReady = $scope.vapeReady;

                console.log("logged in ??", $rootScope.isLoggedIn());
                console.log($scope.liquid);

                // TODO If not logged in show popup with login and sign up button!
                if ($scope.isLoggedIn()) {
                    $scope.liquid.vapeReady = $scope.vapeReady;
                    $scope.liquid.private = $scope.private;
                    if (clone) {
                        // Clone recipe
                        $scope.liquid.id = false; // If id is false API will create new recipe.
                        RecipeService.save($scope.liquid, function (status, data) {

                            console.log({
                                status: status,
                                data:   data
                            });

                            if(status !== 200) {
                                MyNotify.notify("Something went wrong, please try again.", status);
                            } else if (status === 200) {
                                $location.url('/my_recipes');
                            }
                        });
                    } else {
                        // Save recipe
                        RecipeService.save($scope.liquid, function (status, data) {

                            console.log({
                                status: status,
                                data:   data
                            });

                            if(status !== 200) {
                                MyNotify.notify("Something went wrong, please try again.", status);
                            } else if (status === 200) {
                                $location.url('/my_recipes');
                            }
                        });
                    }
                } else {
                    // Show popup.
                    $scope.loginWarning();
                }
            }

        };

        /* Liquid calculator watcher */

        $scope.$watch('liquid.vg', function(newVal, oldVal){
            $scope.liquid.pg = 100 - $scope.liquid.vg;
            $scope.liquid.base = $scope.liquid.pg + $scope.liquid.vg;
        }, true);

        $scope.$watch('liquid.pg', function(newVal, oldVal){
            $scope.liquid.vg = 100 - $scope.liquid.pg;
        }, true);

        $scope.$watch('liquid.nicotine.vg', function(newVal, oldVal){
            $scope.liquid.nicotine.pg = 100 - $scope.liquid.nicotine.vg;
        }, true);

        $scope.$watch('liquid.nicotine.pg', function(newVal, oldVal){
            $scope.liquid.nicotine.vg = 100 - $scope.liquid.nicotine.pg;
        }, true);

        // Vape- omly users don't need 100% PG base!
        $scope.$watch('vapeReady', function(newVal, oldVal){
            if($scope.vapeReady) {
                $scope.liquid.nicotine.vg = 50;
                $scope.liquid.nicotine.pg = 50;
                $scope.liquid.nicotine.strength = $scope.liquid.desired_strength;
            } else {
                $scope.liquid.nicotine.vg = 0;
                $scope.liquid.nicotine.pg = 100;
                $scope.liquid.nicotine.strength = 100;
            }
        }, true);

        $scope.$watch('liquid', function(newVal, oldVal){
            $scope.recipeCalculation();

            // Here I try to avoid duplicate flavor names.
            let uniqueFlavors = $scope.liquid.flavor.filter((set => f => !set.has(f.name) && set.add(f.name))(new Set));
            $scope.duplicateFlavorNames = uniqueFlavors.length !== $scope.liquid.flavor.length;

            // if ($scope.duplicateFlavorNames) {
            //     MyNotify.notify("You have duplicate flavor names, please change one of duplicated flavor names...", 400);
            // }
        }, true);

        $scope.$watch('weights', function(newVal, oldVal){
            $scope.recipeCalculation();
        }, true);

        $scope.$watch('selectedLang', function(newVal, oldVal){
            $scope.translateTootips();
        }, true);

        $scope.calculateIngredients = function () {
            $scope.ingridients.vg_dilutant.ml = $scope.getAmountFromPercentage($scope.liquid.vg);
            $scope.ingridients.vg_dilutant.percentage = $scope.liquid.vg;

            $scope.ingridients.pg_dilutant.ml = $scope.getAmountFromPercentage($scope.liquid.pg);
            $scope.ingridients.pg_dilutant.percentage = $scope.liquid.pg;

            // Calculate nicotine juice.
            // If we have 100 mg of nicotine in 100 ml of nicotine juice
            // we need to add 10 ml of nicotine juice to have 10 mg strength.
            let nicotine_juice_procentage = $scope.liquid.desired_strength / ($scope.liquid.nicotine.strength / 100);
            $scope.ingridients.nicotine_juice.ml = $scope.getAmountFromPercentage(nicotine_juice_procentage);
            $scope.ingridients.nicotine_juice.percentage = nicotine_juice_procentage;

            // Calculate water amount
            $scope.ingridients.wvpga.ml = $scope.getAmountFromPercentage($scope.liquid.wvpga);
            $scope.ingridients.wvpga.percentage = $scope.liquid.wvpga;


            // Determent how much to remove from base
            let removeFromBase = {
                pg: ($scope.liquid.nicotine.pg / 100) * $scope.ingridients.nicotine_juice.percentage,
                vg: ($scope.liquid.nicotine.vg / 100) * $scope.ingridients.nicotine_juice.percentage
            };
            // Remove PG and VG from base ingredients.
            $scope.ingridients.vg_dilutant.percentage = $scope.ingridients.vg_dilutant.percentage - removeFromBase.vg;
            $scope.ingridients.vg_dilutant.ml = $scope.getAmountFromPercentage($scope.ingridients.vg_dilutant.percentage);
            $scope.ingridients.pg_dilutant.percentage = $scope.ingridients.pg_dilutant.percentage - removeFromBase.pg;
            $scope.ingridients.pg_dilutant.ml = $scope.getAmountFromPercentage($scope.ingridients.pg_dilutant.percentage);

            // Remove diluent from pg and vg
            $scope.ingridients.vg_dilutant.percentage = $scope.ingridients.vg_dilutant.percentage - ($scope.liquid.wvpga / 2);
            $scope.ingridients.vg_dilutant.ml = $scope.getAmountFromPercentage($scope.ingridients.vg_dilutant.percentage);
            $scope.ingridients.pg_dilutant.percentage = $scope.ingridients.pg_dilutant.percentage - ($scope.liquid.wvpga / 2);
            $scope.ingridients.pg_dilutant.ml = $scope.getAmountFromPercentage($scope.ingridients.pg_dilutant.percentage);

            // Remove flavor from pg and vg
            angular.forEach($scope.liquid.flavor, function (val, key) {
                if(val.type === "vg") {
                    let removeFromVg = ($scope.liquid.amount / 100) * val.percentage;
                    $scope.ingridients.vg_dilutant.ml = $scope.ingridients.vg_dilutant.ml - removeFromVg;
                    $scope.ingridients.vg_dilutant.percentage = $scope.ingridients.vg_dilutant.percentage - val.percentage;
                } else if(val.type === "pg") {
                    let removeFromPg = ($scope.liquid.amount / 100) * val.percentage;
                    $scope.ingridients.pg_dilutant.ml = $scope.ingridients.pg_dilutant.ml - removeFromPg;
                    $scope.ingridients.pg_dilutant.percentage = $scope.ingridients.pg_dilutant.percentage - val.percentage;
                }
                $scope.ingridients.flavor[key] = {
                    name: val.name,
                    percentage: val.percentage,
                    amount: $scope.getAmountFromPercentage(val.percentage),
                    type: val.type,
                    grams: $scope.getAmountFromPercentage(val.percentage) * $scope.weights.flavor
                }

            });

            // Open attention popup if PG or VG is negative
            if($scope.ingridients.pg_dilutant.ml < 0 || $scope.ingridients.vg_dilutant.ml < 0) {
                $scope.openAttention();
            }

            // Save good data history (try not to save data with negative values)
            if($scope.ingridients.pg_dilutant.ml >= 0 && $scope.ingridients.vg_dilutant.ml >= 0) {

                let tempIngredients = angular.copy($scope.ingridients);
                let tempLiquid = angular.copy($scope.liquid);

                $scope.history.push({
                    ingridients: tempIngredients,
                    liquid: tempLiquid,
                    time: new Date()
                });

                $scope.disableSave = false;
            } else {
                $scope.disableSave = true;
            }

            // Calculate vape-base
            $scope.ingridients.base.ml = $scope.ingridients.vg_dilutant.ml + $scope.ingridients.pg_dilutant.ml + $scope.ingridients.nicotine_juice.ml;
            $scope.ingridients.base.percentage = $scope.ingridients.vg_dilutant.percentage + $scope.ingridients.pg_dilutant.percentage + $scope.ingridients.nicotine_juice.percentage;
        };

        $scope.getAmountFromPercentage = function (percentage) {
            return ($scope.liquid.amount / 100) * percentage;
        };

        $scope.calculateGrams = function() {
            $scope.ingridients.pg_dilutant.gr = $scope.ingridients.pg_dilutant.ml * $scope.weights.pg;
            $scope.ingridients.vg_dilutant.gr = $scope.ingridients.vg_dilutant.ml * $scope.weights.vg;
            $scope.ingridients.wvpga.gr = $scope.ingridients.wvpga.ml * $scope.weights.diluent;

            // Nicotine percentage of PG and VG
            let pgPercentage = $scope.liquid.nicotine.pg;
            let vgPercentage = $scope.liquid.nicotine.vg;

            // Milliliters of nicotine PG and VG
            let pgOfNicMl = (pgPercentage / 100) * $scope.ingridients.nicotine_juice.ml;
            let vgOfNicMl = (vgPercentage / 100) * $scope.ingridients.nicotine_juice.ml;

            // Grams of nicotine PG and VG
            let pgOfNicGr = pgOfNicMl * $scope.weights.pg;
            let vgOfNicGr = vgOfNicMl * $scope.weights.vg;

            // Total nicotine juice in grams
            $scope.ingridients.nicotine_juice.gr = pgOfNicGr + vgOfNicGr;

            // Vape ready
            $scope.ingridients.base.gr = $scope.ingridients.vg_dilutant.gr + $scope.ingridients.pg_dilutant.gr + $scope.ingridients.nicotine_juice.gr;
        };

        $scope.calculateTotal = function () {
            // For milliliters
            $scope.ingridients.amount.ml =
                $scope.ingridients.pg_dilutant.ml
                + $scope.ingridients.vg_dilutant.ml
                + $scope.ingridients.nicotine_juice.ml
                + $scope.ingridients.wvpga.ml;

            // For grams
            $scope.ingridients.amount.gr =
                $scope.ingridients.pg_dilutant.gr
                + $scope.ingridients.vg_dilutant.gr
                + $scope.ingridients.nicotine_juice.gr
                + $scope.ingridients.wvpga.gr;

            // console.log(
            //     $scope.ingridients.pg_dilutant.gr,
            //     $scope.ingridients.vg_dilutant.gr,
            //     $scope.ingridients.nicotine_juice.gr,
            //     $scope.ingridients.wvpga.gr
            // );

            // For percentage
            $scope.ingridients.amount.percentage =
                $scope.ingridients.pg_dilutant.percentage
                + $scope.ingridients.vg_dilutant.percentage
                + $scope.ingridients.nicotine_juice.percentage
                + $scope.ingridients.wvpga.percentage;

            angular.forEach($scope.ingridients.flavor, function (val, key) {
                $scope.ingridients.amount.ml += val.amount;
                $scope.ingridients.amount.gr += val.grams;
                $scope.ingridients.amount.percentage += val.percentage;
            })
        };

        $scope.recipeCalculation = function() {
            if($scope.vapeReady) {
                $scope.calculateIngredientsVapeOnly();
            } else {
                $scope.calculateIngredients();
                $scope.calculateGrams();
                $scope.calculateTotal();
            }
            $scope.generateLiquidName();
        };

        $scope.generateLiquidName = function() {
            $scope.liquid.name = "";

            angular.forEach($scope.liquid.flavor, function (val, key) {
                $scope.liquid.name += val.name + ", ";
            });

            $scope.liquid.name += $scope.liquid.pg + "/" + $scope.liquid.vg + ", ";
            $scope.liquid.name += $scope.liquid.desired_strength + " mg";
        };

        $scope.openPrintLabelModal = function() {

            $uibModal.open({
                controller: 'printLabelCtrl',
                templateUrl: 'app/modules/modals/print_label/view.html',
                backdrop: true,
                resolve: {
                    item: function () {
                        return $scope.liquid;
                    }
                }
            })
                .result.then(function(location){
                    if(location) {
                        // console.log("works", location);
                        $location.url('/' + location);
                    }
                }, function(res){
                    console.log("ERROR", res);
                }
            );
        };

        $scope.deleteRecipe = function() {
            let isConfirmed = confirm("Are you sure to delete this record ?");
            if (isConfirmed && $scope.liquid.id) {
                RecipeService.deleteRecipe($scope.liquid.id, function (status, data) {
                    MyNotify.notify(data, status);
                    $location.url('/my_recipes');
                });
            } else {
                return false;
            }
        };

        /**
         * VAPE ONLY FUNCTIONS
         */

        $scope.calculateIngredientsVapeOnly = function () {

            $scope.ingridients.wvpga = {
                ml: $scope.getAmountFromPercentage($scope.liquid.wvpga),
                gr: $scope.getAmountFromPercentage($scope.liquid.wvpga) * $scope.weights.diluent,
                percentage: $scope.liquid.wvpga
            };

            // Subtract diluent from base
            $scope.ingridients.base.percentage = 100 - $scope.ingridients.wvpga.percentage;
            $scope.ingridients.base.ml = $scope.getAmountFromPercentage($scope.ingridients.base.percentage);
            $scope.ingridients.base.gr = $scope.calculateBaseWeight();

            $scope.ingridients.amount = {
                ml: $scope.ingridients.base.ml + $scope.ingridients.wvpga.ml,
                gr: $scope.ingridients.base.gr + $scope.ingridients.wvpga.gr,
                percentage: 100
            };

            // Remove flavor from base
            angular.forEach($scope.liquid.flavor, function (val, key) {
                $scope.ingridients.base.percentage -= val.percentage;
                $scope.ingridients.base.ml = $scope.getAmountFromPercentage($scope.ingridients.base.percentage);

                $scope.ingridients.flavor[key] = {
                    name: val.name,
                    percentage: val.percentage,
                    amount: $scope.getAmountFromPercentage(val.percentage),
                    type: val.type,
                    grams: $scope.getAmountFromPercentage(val.percentage) * $scope.weights.flavor
                };

                $scope.ingridients.base.gr += $scope.ingridients.flavor[key].grams;

                $scope.limitedSlider.options.maxLimit = Math.round($scope.limitedSlider.options.ceil / ($scope.ingridients.flavor.length + 1));
            });

        };

        /**
         * We already have percentage of PG and VG
         * to get weights we first need to get milliliters
         * then we get weight for PG and VG
         * then return sum of those two.
         */
        $scope.calculateBaseWeight = function() {
            let pgMilliliters = ($scope.ingridients.base.ml / 100) * $scope.liquid.nicotine.pg;
            let vgMilliliters = ($scope.ingridients.base.ml / 100) * $scope.liquid.nicotine.vg;

            let pgWeight = pgMilliliters * $scope.weights.pg;
            let vgWeight = vgMilliliters * $scope.weights.vg;

            return pgWeight + vgWeight;
        };

        $scope.loadRecipe = function (recipeId) {
            RecipeService.getRecipe(recipeId, function (status, data) {

                console.log({
                    status: status,
                    data:   data
                });

                if (data.vape_ready === 1) {
                    $scope.vapeReady = true;
                } else {
                    $scope.vapeReady = false;
                }

                if (data.private === 1) {
                    $scope.private = true;
                } else {
                    $scope.private = false;
                }

                // I need timeout here because "vapeReady" var will break nicotine values.
                $timeout( function(){
                    $scope.liquid.id = data.id;
                    $scope.liquid.name = data.name;
                    $scope.liquid.amount = data.amount;
                    $scope.liquid.desired_strength = data.desired_strength;
                    $scope.liquid.pg = data.pg;
                    $scope.liquid.vg = data.vg;
                    $scope.liquid.nicotine.strength = 70;
                    $scope.liquid.nicotine.pg = data.nicotine_pg;
                    $scope.liquid.nicotine.vg = data.nicotine_vg;
                    $scope.liquid.wvpga = data.wvpga;
                    $scope.liquid.sleep_time = data.sleep_time;
                    $scope.liquid.flavor = data.recipe_flavors;
                    $scope.liquid.comment = data.comment;
                    $scope.liquid.owner = $scope.ownerOrNot(data.user.id); // Recipe owner

                    $scope.flavorFields = [];
                    $scope.flavorsCount = 0;

                    angular.forEach(data.recipe_flavors, function (flavor) {
                        $scope.flavorsCount++;
                        $scope.flavorFields.push($scope.flavorsCount);
                    })
                }, 300 );

                if(status !== 200) {
                    MyNotify.notify("Something went wrong, please try again.", status);
                }
            });
        };

        // Just return true or false
        $scope.ownerOrNot = function (userId) {
            // If user is not logged in than he can not be a owner of this recipe.
            if ($sessionStorage.currentUser === undefined) {
                return false;
            } else {
                return $sessionStorage.currentUser.user_id === userId;
            }
        };

        if($routeParams.recipe_id !== undefined) {

            let recipeId = $routeParams.recipe_id;
            console.log("recipe ID", recipeId);

            $scope.loadRecipe(recipeId);

        }

        $scope.socialNetworks = {
            url: window.location.href,
            name: "Check out my new vape recipe",
            image: "https://i.pinimg.com/736x/a5/c6/d4/a5c6d48a6dc682f42ea48109bcf33783.jpg"
        };

        console.log("networks", $scope.socialNetworks);
    }]);
