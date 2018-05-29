angular.module('gelApp.DropdownController', []);

angular.module('gelApp.DropdownController').controller('DropdownController', ['$scope', '$translate', '$rootScope', function ($scope, $translate, $rootScope) {

    $scope.changeLanguage = function (langKey) {
        $translate.use(langKey);
        $rootScope.selectedLang = $translate.use(false);
    };

    var vm = [];

    vm.isCollapsed = true;
    vm.status = {
        isopen: false
    };

    $scope.vm = vm;

}]);
