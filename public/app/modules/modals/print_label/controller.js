angular.module('gelApp.printLabel', []);

angular.module('gelApp.printLabel').controller('printLabelCtrl', ['$scope', 'item', '$uibModalInstance', '$timeout', function ($scope, item, $uibModalInstance, $timeout) {


    $scope.print = function() {

        var printContents = document.getElementById('printMe').innerHTML;
        var popupWin = window.open('', '_blank', 'width=1920,height=1080');
        popupWin.document.open();
        popupWin.document.write('<html><head><link rel="stylesheet" type="text/css" href="style.css" /></head><body onload="window.print()">' + printContents + '</body></html>');
        popupWin.document.close();

        // $uibModalInstance.close();
    };

    $scope.close = function(){
        $uibModalInstance.close();
    };

    $scope.fontSize = 2;
    $scope.flavors = item.flavor;
    $scope.pg = item.pg;
    $scope.vg = item.vg;
    $scope.desired_strength = item.desired_strength;
    $scope.flavors = [];

    $scope.show = {
        pgVg: true,
        desired_strength: true,
        flavors: []
    };

    angular.forEach(item.flavor, function (flavor, key) {
        $scope.flavors.push(flavor.name);
        $scope.show.flavors[key] = true;
    })
}]);
