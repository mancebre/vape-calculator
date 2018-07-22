App.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    $routeProvider.when('/', {
        title: 'Home',
        controller: 'homeCtrl',
        templateUrl: '/app/modules/home/view.html'
    }).when('/recipe/:recipe_id', {
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
    }).when('/contact', {
        title: 'Contact',
        controller: 'contactCtrl',
        templateUrl: '/app/modules/contact/view.html'
    }).when('/login', {
        title: 'Login',
        controller: 'userCtrl',
        templateUrl: '/app/modules/user/view.html'
    }).when('/registration', {
        title: 'Signup',
        controller: 'registrationCtrl',
        templateUrl: '/app/modules/registration/view.html'
    }).when('/my_recipes', {
        title: 'My Recipes',
        controller: 'my_recipesCtrl',
        templateUrl: '/app/modules/my_recipes/view.html'
    }).otherwise({
        redirectTo: '/'
    });

    $locationProvider.html5Mode(true);

}]);