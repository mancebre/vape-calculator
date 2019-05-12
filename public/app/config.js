// Tooltip configuration
// https://github.com/720kb/angular-tooltips
App.config(['tooltipsConfProvider', function configConf(tooltipsConfProvider) {
    tooltipsConfProvider.configure({
        'smart': true,
        'size': 'large',
        'speed': 'fast',
        'tooltipTemplateUrlCache': true
    });
}]);

App.run(function($rootScope, $http, $translate, $sessionStorage) {

    // // API url LOCAL for testing only!
    $rootScope.apiUrl = 'http://localhost:8000/api/v1/';

    // // API url TESTING for testing only!
    // $rootScope.apiUrl = 'http://test.vaperscuisine.com/backend/public/api/v1/';
    /**
     * Maintenance mode
     */
    $rootScope.maintenanceMode = true;
});
