angular.module('gelApp.DropdownController', []);

angular.module('gelApp.DropdownController').controller('DropdownController', ['$scope', '$translate', function ($scope, $translate) {

    $scope.changeLanguage = function (langKey) {
        $translate.use(langKey);
    };

    var vm = [];

    vm.isCollapsed = true;
    vm.status = {
        isopen: false
    };

    $scope.vm = vm;

}]);
