
/* GLOBALS */

App.run(function($rootScope, $http, $translate, $localStorage) {

    $rootScope.preLoginRoute = null;

    $rootScope.isLoggedIn = function() {
        return $localStorage.currentUser ? true : false;
    };

    $http.defaults.headers.common.Authorization = localStorage.getItem("Token") ? localStorage.getItem("Token") : '';

    $rootScope.selectedLang = $translate.use(false);

    /* Loading animation */
    $rootScope.loading = false;

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

    // Load gapi.auth2 so users can logout from google anywhere.
    if(typeof gapi !== "undefined") {
        gapi.load('auth2', function() {
            gapi.auth2.init();
        });
    } else {
        setTimeout(function() {
            gapi.load('auth2', function() {
                gapi.auth2.init();
            });
        }, 800);
    }
});