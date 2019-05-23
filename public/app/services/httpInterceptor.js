
App.factory('httpInterceptor', ['$q', '$window', '$injector',
    function($q, $window, $injector) {
        return {
            // optional method
            'responseError': function(rejection) {
                // Here you can do something in response error, like handle errors, present error messages etc.

                if(rejection.status === 401) { // Unauthorized
                    // remove user from local storage and clear http auth header
                    let AuthenticationService = $injector.get('AuthenticationService');
                    AuthenticationService.Logout();

                    alert("Your session has expired, please login.");
                    $window.location.href = "/login";
                }

                // if (canRecover(rejection)) {
                //     return responseOrNewPromise
                // }
                return $q.reject(rejection);
            }
        };
    }])
    .config(function($httpProvider) {
        $httpProvider.interceptors.push('httpInterceptor');
    });