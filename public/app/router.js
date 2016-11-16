App.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    $locationProvider.html5Mode(true);

    $routeProvider.when('/', {
        title: 'Home',
        controller: 'homeCtrl',
        templateUrl: '/app/modules/home/view.html'
    }).when('/test', {
        title: 'Test',
        controller: 'testCtrl',
        templateUrl: '/app/modules/test/view.html'
    }).when('/plans', {
        title: 'Plans',
        controller: 'plansCtrl',
        templateUrl: '/app/modules/plans/view.html'
    }).otherwise({
        redirectTo: '/'
    });

}]);