angular.module('gelApp.home', []);

angular.module('gelApp.home').controller('homeCtrl', ['$scope', '$http', '$translate', '$uibModal', 'tooltipTranslations', '$rootScope', function ($scope, $http, $translate, $uibModal, tooltipTranslations, $rootScope) {

    // This is true when attention popup is open.
    $scope.attentionPopup = false;
    $scope.history = [];

    $scope.translateTootips = function () {
        $scope.tt = tooltipTranslations[$rootScope.selectedLang];
    };

    // How many grams there is in 1 ml
    if(localStorage.getItem('weights') !== null) {
        $scope.weights = JSON.parse(localStorage.getItem('weights'));
    } else {
        // Default values
        $scope.weights = {
            pg: 1.04,
            vg: 1.26,
            flavor: 1.04,
            diluent: 1
        };
        localStorage.setItem('weights', JSON.stringify($scope.weights));
    }

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

    $scope.slider = {
        value: $scope.liquid.pg,
        options: {
            floor: 0,
            ceil: 100
        }
    };

    //5. create submitStudentForm() function. This will be called when user submits the form
    $scope.submitLiquidForm = function () {
        return false; // For now
        console.log($scope.liquid);

        var onSuccess = function (data, status, headers, config) {
            alert('Student saved successfully.');
        };

        var onError = function (data, status, headers, config) {
            alert('Error occured.');
        };

        $http.post('/liquid/submitData', { liquid:$scope.liquid })
            .success(onSuccess)
            .error(onError);

    };

    //6. create resetForm() function. This will be called on Reset button click.
    // Reset button is not working right, maybe I don't need it at all!
    // $scope.resetForm = function () {
    //     $scope.liquid = angular.copy($scope.originalLiquid);
    // };

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
            $scope.liquid.nicotine.strength = 6;
        } else {
            $scope.liquid.nicotine.vg = 0;
            $scope.liquid.nicotine.pg = 100;
            $scope.liquid.nicotine.strength = 100;
        }
    }, true);

    $scope.$watch('liquid', function(newVal, oldVal){
        $scope.calculateIngredients();
        $scope.calculateGrams();
        $scope.calculateTotal();
    }, true);

    $scope.$watch('weights', function(newVal, oldVal){
        $scope.calculateIngredients();
        $scope.calculateGrams();
        $scope.calculateTotal();
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
        var nicotine_juice_procentage = $scope.liquid.desired_strength / ($scope.liquid.nicotine.strength / 100);
        $scope.ingridients.nicotine_juice.ml = $scope.getAmountFromPercentage(nicotine_juice_procentage);
        $scope.ingridients.nicotine_juice.percentage = nicotine_juice_procentage;

        // Calculate water amount
        $scope.ingridients.wvpga.ml = $scope.getAmountFromPercentage($scope.liquid.wvpga);
        $scope.ingridients.wvpga.percentage = $scope.liquid.wvpga;


        // Determent how much to remove from base
        var removeFromBase = {
            pg: ($scope.liquid.nicotine.pg / 100) * $scope.ingridients.nicotine_juice.percentage,
            vg: ($scope.liquid.nicotine.vg / 100) * $scope.ingridients.nicotine_juice.percentage
        };
        // Remove PG and VG from base ingredients.
        $scope.ingridients.vg_dilutant.percentage = $scope.ingridients.vg_dilutant.percentage - removeFromBase.vg;
        $scope.ingridients.vg_dilutant.ml = $scope.getAmountFromPercentage($scope.ingridients.vg_dilutant.percentage);
        $scope.ingridients.pg_dilutant.percentage = $scope.ingridients.pg_dilutant.percentage - removeFromBase.pg;
        $scope.ingridients.pg_dilutant.ml = $scope.getAmountFromPercentage($scope.ingridients.pg_dilutant.percentage);

        // Remove diluent from pg and vg
        $scope.ingridients.vg_dilutant.ml = $scope.ingridients.vg_dilutant.ml - (($scope.liquid.amount / 2 / 100) * $scope.liquid.wvpga);
        $scope.ingridients.vg_dilutant.percentage = $scope.ingridients.vg_dilutant.percentage - (($scope.liquid.amount / 2 / 100) * $scope.liquid.wvpga);
        $scope.ingridients.pg_dilutant.ml = $scope.ingridients.pg_dilutant.ml - (($scope.liquid.amount / 2 / 100) * $scope.liquid.wvpga);
        $scope.ingridients.pg_dilutant.percentage = $scope.ingridients.pg_dilutant.percentage - (($scope.liquid.amount / 2 / 100) * $scope.liquid.wvpga);

        // Remove flavor from pg and vg
        angular.forEach($scope.liquid.flavor, function (val, key) {
            if(val.type === "vg") {
                var removeFromVg = ($scope.liquid.amount / 100) * val.percentage;
                $scope.ingridients.vg_dilutant.ml = $scope.ingridients.vg_dilutant.ml - removeFromVg;
                $scope.ingridients.vg_dilutant.percentage = $scope.ingridients.vg_dilutant.percentage - val.percentage;
            } else if(val.type === "pg") {
                var removeFromPg = ($scope.liquid.amount / 100) * val.percentage;
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
        var pgPercentage = $scope.liquid.nicotine.pg;
        var vgPercentage = $scope.liquid.nicotine.vg;

        // Milliliters of nicotine PG and VG
        var pgOfNicMl = (pgPercentage / 100) * $scope.ingridients.nicotine_juice.ml;
        var vgOfNicMl = (vgPercentage / 100) * $scope.ingridients.nicotine_juice.ml;

        // Grams of nicotine PG and VG
        var pgOfNicGr = pgOfNicMl * $scope.weights.pg;
        var vgOfNicGr = vgOfNicMl * $scope.weights.vg;

        // Total nicotine juice in grams
        $scope.ingridients.nicotine_juice.gr = pgOfNicGr + vgOfNicGr;

        // Vape ready
        $scope.ingridients.base.gr = $scope.ingridients.vg_dilutant.gr + $scope.ingridients.pg_dilutant.gr + $scope.ingridients.nicotine_juice.gr;
    };

    $scope.calculateTotal = function () {
        // For milliliters
        $scope.ingridients.amount.ml = $scope.ingridients.pg_dilutant.ml
            + $scope.ingridients.vg_dilutant.ml
            + $scope.ingridients.nicotine_juice.ml
            + $scope.ingridients.wvpga.ml;

        // For grams
        $scope.ingridients.amount.gr = $scope.ingridients.pg_dilutant.gr
            + $scope.ingridients.vg_dilutant.gr
            + $scope.ingridients.nicotine_juice.gr
            + $scope.ingridients.wvpga.gr;

        // For percentage
        $scope.ingridients.amount.percentage = $scope.ingridients.pg_dilutant.percentage
            + $scope.ingridients.vg_dilutant.percentage
            + $scope.ingridients.nicotine_juice.percentage
            + $scope.ingridients.wvpga.percentage;

        angular.forEach($scope.ingridients.flavor, function (val, key) {
            $scope.ingridients.amount.ml += val.amount;
            $scope.ingridients.amount.gr += val.grams;
            $scope.ingridients.amount.percentage += val.percentage;
        })
    }
}]);
