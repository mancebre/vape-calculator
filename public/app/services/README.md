##USE SERVICES TO AVOID CREATING OF A ZILLION ROOT FUNCTIONS.

###How to use services.

1. In folder services create new js file for each service.
2. This ih how to define a service:

```javascript
App.factory('myService', function() {
    return {
        foo: function() {
            alert("I'm foo!");
        }
    };
});
```

3. How to use service in your controller.

```javascript
App.controller('MainCtrl', ['$scope', 'myService', function($scope, myService) {
    $scope.callFoo = function() {
        myService.foo();
    }
}]);
```