
/* GLOBALS */

App.run(function($rootScope, $http, $translate, $localStorage) {
    $rootScope.testFunc = function () {
        if($rootScope.toggle) {
            $rootScope.something = ["one", "two"];
            $rootScope.toggle = false;
        } else {
            $rootScope.something = [1, 2, 3];
            $rootScope.toggle = true;
        }
    };

    $rootScope.isLoggedIn = function() {
        return $localStorage.currentUser ? true : false;
    };

    $http.defaults.headers.common.Authorization = localStorage.getItem("Token");

    $rootScope.selectedLang = $translate.use(false);

    // // API url INTERNAL for testing only!
    // $rootScope.apiUrl = 'http://127.0.0.1:5000/';
    $rootScope.apiUrl = 'http://localhost:8000/api/v1/';
    // API url EXTERNAL for testing only! Most of this do not work with external API :(
    // $rootScope.apiUrl = 'https://jsonplaceholder.typicode.com/posts';

    // Basic API config
    // $rootScope.apiConfig = {
    //     headers: {'Authorization': 'Token token=xxxxYYYYZzzz'}
    // };

    /* Loading animation */
    $rootScope.loading = false;
    /**
     * Maintenance mode
     */
    $rootScope.maintenanceMode = true;

    // If there is any pending request keep loader open.
    $rootScope.$watch(function() {
        return $http.pendingRequests.length > 0;
    }, function(hasPending) {
        $rootScope.loading = !!hasPending;
    });
});