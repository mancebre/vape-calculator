
/* GLOBALS */

App.run(function($rootScope, $http, $translate) {
    $rootScope.testFunc = function () {
        if($rootScope.toggle) {
            $rootScope.something = ["one", "two"];
            $rootScope.toggle = false;
        } else {
            $rootScope.something = [1, 2, 3];
            $rootScope.toggle = true;
        }
    };

    $rootScope.selectedLang = $translate.use(false);

    // // API url INTERNAL for testing only!
    $rootScope.apiUrl = 'http://localhost:3000/posts';
    // API url EXTERNAL for testing only! Most of this do not work with external API :(
    // $rootScope.apiUrl = 'https://jsonplaceholder.typicode.com/posts';

    // Basic API config
    $rootScope.apiConfig = {
        headers: {'Authorization': 'Token token=xxxxYYYYZzzz'}
    };

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