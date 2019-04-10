angular.module('gelApp.addRecipeName', []);

angular.module('gelApp.addRecipeName').controller('addRecipeNameCtrl',
    ['$scope', 'item', '$uibModalInstance', '$timeout',
        function ($scope, item, $uibModalInstance, $timeout) {

            $scope.liquid = item;
            $scope.liquidName = null;

            $scope.close = function(){
                $uibModalInstance.close(undefined);
            };
            $scope.save = function(){
                $uibModalInstance.close($scope.liquidName);
            };

            $scope.generateLiquidName = function() {
                $scope.liquidName = "";

                angular.forEach($scope.liquid.flavor, function (val, key) {
                    $scope.liquidName += val.name + ", ";
                });

                if($scope.vapeReady) {
                    $scope.liquidName += $scope.liquid.nicotine.pg + "/" + $scope.liquid.nicotine.vg + ", ";
                    $scope.liquidName += $scope.liquid.nicotine.strength + " mg";
                } else {
                    $scope.liquidName += $scope.liquid.pg + "/" + $scope.liquid.vg + ", ";
                    $scope.liquidName += $scope.liquid.desired_strength + " mg";
                }
            };
}]);
