angular.module('gelApp.home', []);

angular.module('gelApp.home').controller('homeCtrl', ['$scope', '$http', function ($scope, $http) {

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
        flavor:             [],
        sleep_time:         7,
        comment:            ""

    };

    // Ingredients to be calculated
    $scope.ingridients = {
        nicotine_juice: 0,
        pg_dilutant:    0,
        vg_dilutant:    0,
        wvpga:          0,
        flavor:         [],
        amountMl:       0
    };

    $scope.flavorsCount = 1;
    $scope.flavorFields = [];

    $scope.addField = function(){
        $scope.flavorFields.push($scope.flavorsCount);
        $scope.liquid.flavor[$scope.flavorsCount] = {
            percentage: 0,
            amount:     0,
            type:       'pg',
            name:       'Flavor ' + $scope.flavorsCount
        };
        $scope.flavorsCount++
    };

    //4. copy originalLiquid to liquid. liquid will be bind to a form
    $scope.liquid = angular.copy($scope.originalLiquid);

    //5. create submitStudentForm() function. This will be called when user submits the form
    $scope.submitLiquidForm = function () {
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

    $scope.$watch('liquid', function(newVal, oldVal){
        $scope.calculateIngredients();
        $scope.calculateTotal();
    }, true);

    $scope.calculateIngredients = function () {
        $scope.ingridients.vg_dilutant = $scope.getAmountFromPercentage($scope.liquid.vg);
        $scope.ingridients.pg_dilutant = $scope.getAmountFromPercentage($scope.liquid.pg);

        // Calculate nicotine juice.

        // If we have 100 mg of nicotine in 100 ml of nicotine juice
        // we need to add 10 ml of nicotine juice to have 10 mg strength.
        $scope.ingridients.nicotine_juice = $scope.liquid.desired_strength / ($scope.liquid.nicotine.strength / 100);

        // Calculate water amount
        $scope.ingridients.wvpga = $scope.getAmountFromPercentage($scope.liquid.wvpga);


        // Determent how much to remove from base
        var removeFromBase = {
            pg: ($scope.liquid.nicotine.pg / 100) * $scope.ingridients.nicotine_juice,
            vg: ($scope.liquid.nicotine.vg / 100) * $scope.ingridients.nicotine_juice
        };
        // Remove PG and VG from base ingredients.
        $scope.ingridients.vg_dilutant = $scope.ingridients.vg_dilutant - removeFromBase.vg;
        $scope.ingridients.pg_dilutant = $scope.ingridients.pg_dilutant - removeFromBase.pg;

        // Remove diluent from pg and vg
        $scope.ingridients.vg_dilutant = $scope.ingridients.vg_dilutant - (($scope.liquid.amount / 2 / 100) * $scope.liquid.wvpga);
        $scope.ingridients.pg_dilutant = $scope.ingridients.pg_dilutant - (($scope.liquid.amount / 2 / 100) * $scope.liquid.wvpga);

        // Remove flavor from pg and vg
        angular.forEach($scope.liquid.flavor, function (val, key) {
            if(val.type === "vg") {
                var removeFromVg = ($scope.liquid.amount / 100) * val.percentage;
                $scope.ingridients.vg_dilutant = $scope.ingridients.vg_dilutant - removeFromVg;
            } else if(val.type === "pg") {
                var removeFromPg = ($scope.liquid.amount / 100) * val.percentage;
                $scope.ingridients.pg_dilutant = $scope.ingridients.pg_dilutant - removeFromPg;
            }
            $scope.ingridients.flavor[key] = {
                name: val.name,
                percentage: val.percentage,
                amount: $scope.getAmountFromPercentage(val.percentage), //TODO make some calculation to make mililites from this!
                type: val.type
            }

        });
    };

    $scope.getAmountFromPercentage = function (percentage) {
        return ($scope.liquid.amount / 100) * percentage;
    };

    $scope.calculateTotal = function () {
        $scope.ingridients.amountMl = $scope.ingridients.pg_dilutant
            + $scope.ingridients.vg_dilutant
            + $scope.ingridients.nicotine_juice
            + $scope.ingridients.wvpga;

        angular.forEach($scope.ingridients.flavor, function (val, key) {
            $scope.ingridients.amountMl += val.amount;
        })
    }
}]);
