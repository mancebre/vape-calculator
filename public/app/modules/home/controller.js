angular.module('gelApp.home', []);

angular.module('gelApp.home').controller('homeCtrl', ['$scope', '$http', '$translate', function ($scope, $http, $translate) {

    $scope.changeLanguage = function (langKey) {
        $translate.use(langKey);
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
        $scope.calculateTotal();
    }, true);

    $scope.calculateIngredients = function () {
        $scope.ingridients.vg_dilutant.ml = $scope.getAmountFromPercentage($scope.liquid.vg);
        $scope.ingridients.vg_dilutant.percentage = $scope.liquid.vg;

        $scope.ingridients.pg_dilutant.ml = $scope.getAmountFromPercentage($scope.liquid.pg);
        $scope.ingridients.pg_dilutant.percentage = $scope.liquid.pg;

        // Calculate nicotine juice.

        //TODO I don't think this is 100% accurate!!!
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
            } else if(val.type === "pg") {
                var removeFromPg = ($scope.liquid.amount / 100) * val.percentage;
                $scope.ingridients.pg_dilutant.ml = $scope.ingridients.pg_dilutant.ml - removeFromPg;
            }
            $scope.ingridients.flavor[key] = {
                name: val.name,
                percentage: val.percentage,
                amount: $scope.getAmountFromPercentage(val.percentage), //TODO make some calculation to make milliliters from this!
                type: val.type
            }

        });

        // Calculate vape-base
        $scope.ingridients.base.ml = $scope.ingridients.vg_dilutant.ml + $scope.ingridients.pg_dilutant.ml + $scope.ingridients.nicotine_juice.ml;
        $scope.ingridients.base.percentage = $scope.ingridients.vg_dilutant.percentage + $scope.ingridients.pg_dilutant.percentage + $scope.ingridients.nicotine_juice.percentage;
    };

    $scope.getAmountFromPercentage = function (percentage) {
        return ($scope.liquid.amount / 100) * percentage;
    };

    $scope.calculateTotal = function () {
        $scope.ingridients.amount.ml = $scope.ingridients.pg_dilutant.ml
            + $scope.ingridients.vg_dilutant.ml
            + $scope.ingridients.nicotine_juice.ml
            + $scope.ingridients.wvpga.ml;

        angular.forEach($scope.ingridients.flavor, function (val, key) {
            $scope.ingridients.amount.ml += val.amount;
        })
    }
}]);
