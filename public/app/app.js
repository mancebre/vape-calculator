var App = angular.module("gelApp", [
	'ngRoute',
	'gelApp.home',
	'gelApp.test',
	'gelApp.plans'
]);

App.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

	$locationProvider.html5Mode(true);

	$routeProvider.when('/', {
		controller: 'homeCtrl',
		templateUrl: '/app/modules/home/view.html'
	}).when('/test', {
		controller: 'testCtrl',
		templateUrl: '/app/modules/test/view.html'
	}).when('/plans', {
		controller: 'plansCtrl',
		templateUrl: '/app/modules/plans/view.html'
	}).otherwise({ redirectTo: '/' });

}]);
