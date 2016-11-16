angular.module('gelApp.test', []);

angular.module('gelApp.test').controller('testCtrl', ['$rootScope', '$scope', 'myService', '$http', function ($rootScope, $scope, myService, $http) {
    $rootScope.toggle = false;
	$rootScope.something = ["one", "two"];

    // Example of how to use service.
    myService.foo();

    $scope.posts = [];
    $scope.setPosts = function (response) {
        $scope.posts = [];
        var posts = response.data;
        if (posts.length > 0) {
            angular.forEach(posts, function (val) {
                $scope.posts.push(val);
            })
        }
    };

    /* Couple examples of how to handle API requests */
    $scope.refreshPosts = function () {
        $scope.runGet();
    };

    $scope.successCallback = function (response) {
        console.log('success', response);
    };

    $scope.errorCallback = function (response) {
        console.log('error', response);
    };

    $scope.runGet = function (id) {

        var config = $rootScope.apiConfig;
        config.apiUrl = $rootScope.apiUrl + '/' + (id ? id : '');

        $http.get(config.apiUrl, config).then($scope.setPosts, $scope.errorCallback);
    };

    $scope.runPost = function () {

        var config = $rootScope.apiConfig;
        config.data = {title: 'some name'};

        $http.post($rootScope.apiUrl, config.data, config).then($scope.refreshPosts, $scope.errorCallback);
    };

    $scope.runPut = function (id) {

        var config = $rootScope.apiConfig;
        config.apiUrl = $rootScope.apiUrl + '/' + (id ? id : '');
        config.data = {id: id, title: 'updated'};

        $http.put(config.apiUrl, config.data, config).then($scope.refreshPosts, $scope.errorCallback);
    };

    $scope.runDelete = function (id) {

        var config = $rootScope.apiConfig;
        config.apiUrl = $rootScope.apiUrl + '/' + (id ? id : '');

        $http.delete(config.apiUrl, config).then($scope.refreshPosts, $scope.errorCallback);
    };


    $scope.runGet();
}]);
