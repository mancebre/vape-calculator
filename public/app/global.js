
/* GLOBALS */

App.run(function($rootScope, $http, $translate, $sessionStorage) {

    $rootScope.preLoginRoute = null;

    $rootScope.isLoggedIn = function() {
        return $sessionStorage.currentUser ? true : false;
    };

    $http.defaults.headers.common.Authorization = sessionStorage.getItem("Token") ? sessionStorage.getItem("Token") : '';

    $rootScope.selectedLang = $translate.use(false);

    // // API url LOCAL for testing only!
    $rootScope.apiUrl = 'http://localhost:8000/api/v1/';

    // // API url TESTING for testing only!
    // $rootScope.apiUrl = 'http://test.vaperscuisine.com/backend/public/api/v1/';

    /* Loading animation */
    $rootScope.loading = false;
    /**
     * Maintenance mode
     */
    $rootScope.maintenanceMode = true;

    $rootScope.facebookAppId = null; // TODO I need facebook app!!!

    $rootScope.hideHeaderFooter = ['/registration', '/login'];
    $rootScope.showHeader = true;
    $rootScope.showFooter = true;

    // If there is any pending request keep loader open.
    $rootScope.$watch(function() {
        return $http.pendingRequests.length > 0;
    }, function(hasPending) {
        $rootScope.loading = !!hasPending;
    });
});