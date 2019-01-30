angular.module('gelApp.DropdownController', []);

angular.module('gelApp.DropdownController').controller('DropdownController', [
    '$scope', '$translate', '$rootScope', '$location', 'AuthenticationService', '$window',
    function ($scope, $translate, $rootScope, $location, AuthenticationService, $window) {

        /**
         * Delete local storage and redirect user to front page.
         */
        $scope.logoutUser = function() {
            AuthenticationService.Logout();
        };

        $scope.changeLanguage = function (langKey) {
            $translate.use(langKey);
            $rootScope.selectedLang = $translate.use(false);
        };

        $scope.getClass = function (path) {

            return ($location.path().substr(0, path.length) === path) ? 'active' : '';
        };

        let vm = [];

        vm.isCollapsed = true;
        vm.status = {
            isopen: false
        };
        vm.isMobile = $window.innerWidth < 768;

        $scope.vm = vm;

}]);
