

App.directive('googleSignInButton', function() {
    return {
        scope: {
            buttonId: '@',
            options: '&'
        },
        template: '<div></div>',
        link: function(scope, element, attrs) {
            var div = element.find('div')[0];
            div.id = attrs.buttonId;
            gapi.signin2.render(div.id, {
                'scope': 'profile email',
                'width': 'auto',
                'height': 35,
                'longtitle': true,
                'theme': 'light',
                'onsuccess': scope.options().onSuccess,
                'onfailure': scope.options().onFailure
            }); //render a google button, first argument is an id, second options
        }
    };
});