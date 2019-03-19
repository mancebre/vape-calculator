
App.run(['$rootScope', '$route', function($rootScope, $route) {

    /**
     * On each route change, change page title.
     */
    $rootScope.$on('$routeChangeSuccess', function() {
        document.title = $route.current.title + ' | Vapers Cuisine';

        // Hide header and footer on some pages.
        if ($rootScope.hideHeaderFooter.indexOf($route.current.originalPath) !== -1 ) {
            $rootScope.showHeader = false;
            $rootScope.showFooter = false;
        } else {
            $rootScope.showHeader = true;
            $rootScope.showFooter = true;
        }
        console.log("route", $rootScope.hideHeaderFooter.indexOf($route.current.originalPath));
    });
}]);