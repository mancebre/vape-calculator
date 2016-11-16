
/* GLOBALS */

App.run(function($rootScope) {
    $rootScope.testFunc = function () {
        if($rootScope.toggle) {
            $rootScope.something = ["one", "two"];
            $rootScope.toggle = false;
        } else {
            $rootScope.something = [1, 2, 3];
            $rootScope.toggle = true;
        }
    }
});