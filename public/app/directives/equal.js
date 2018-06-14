App.directive('equal', [
    function() {

        var link = function($scope, $element, $attrs, ctrl) {
            ctrl.$validators.equal = function(modelValue, viewValue) {
                var value = modelValue || viewValue;
                var valid = !value || !$attrs.equal || value === $attrs.equal;
                return valid;
            };

            $attrs.$observe('equal', function(comparisonModel){
                ctrl.$validate();
            });

        };

        return {
            require: 'ngModel',
            link: link
        };

    }
]);