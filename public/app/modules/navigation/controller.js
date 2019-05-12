angular.module('gelApp.DropdownController', []);

angular.module('gelApp.DropdownController').controller('DropdownController', [
    '$scope', '$translate', '$rootScope', '$location', 'AuthenticationService', '$window',
    function ($scope, $translate, $rootScope, $location, AuthenticationService, $window) {

        $scope.redirectToLogin = function() {

            $window.location.href = '/login';
        };

        /**
         * Delete local storage and redirect user to front page.
         */
        $scope.logoutUser = function() {
            AuthenticationService.Logout($scope.redirectToLogin);
        };

        $scope.changeLanguage = function (langKey) {
            $translate.use(langKey);
            $rootScope.selectedLang = $translate.use(false);
            $scope.setLangFlag();
        };

        $scope.getClass = function (path) {

            return ($location.path().substr(0, path.length) === path) ? 'active' : '';
        };

        $scope.setLangFlag = function() {
            let langShort = $rootScope.selectedLang;
            if (langShort === 'en') {
                langShort = 'gb';
            }
            $rootScope.selectedLangClass = "flag-icon flag-icon-" + langShort;
        };

        let vm = [];

        vm.status = {
            isopen: false
        };
        vm.isCollapsed = $window.innerWidth < 768;
        vm.isMobile = $window.innerWidth < 768;

        $scope.vm = vm;

        $scope.setLangFlag();

    }]);
