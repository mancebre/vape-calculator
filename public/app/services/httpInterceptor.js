
App.factory('httpInterceptor', ['$q', '$window', '$injector', 'MyNotify',
    function($q, $window, $injector, MyNotify) {
        return {
            // 'request': function(config) {
            //     config.headers = config.headers || {};
            //
            //     // If you have a token in local storage for example:
            //     if ($window.sessionStorage.token) {
            //         // Add the token to "Authorization" header in every request
            //         config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
            //         // In your server you can check if the token is valid and if it's not,
            //         // in responseError method you can take some action
            //     }
            //
            //
            //     // Handle something else
            //
            //     return config;
            // },
            //
            // // Optional method
            // 'requestError': function(rejection) {
            //     // do something on request error
            //
            //     if (canRecover(rejection)) {
            //         return responseOrNewPromise
            //     }
            //     return $q.reject(rejection);
            // },
            //
            // // Optional method
            // 'response': function(response) {
            //     // do something on response success
            //     return response;
            // },

            // optional method
            'responseError': function(rejection) {
                // Here you can do something in response error, like handle errors, present error messages etc.

                if(rejection.status === 401) { // Unauthorized
                    // remove user from local storage and clear http auth header
                    let AuthenticationService = $injector.get('AuthenticationService');
                    AuthenticationService.Logout();

                    MyNotify("Your session has expired, please login.", 400);
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