/**
 * On each route change change page title.
 */
App.run(['$rootScope', '$route', function($rootScope, $route) {
    $rootScope.$on('$routeChangeSuccess', function() {
        document.title = $route.current.title + ' | Guided E-Learning';
    });
}]);