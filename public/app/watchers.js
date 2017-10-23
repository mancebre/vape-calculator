
App.run(['$rootScope', '$route', function($rootScope, $route) {

    /**
     * On each route change, change page title.
     */
    $rootScope.$on('$routeChangeSuccess', function() {
        document.title = $route.current.title + ' | Guided E-Learning';
    });
}]);