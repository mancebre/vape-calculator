angular.module('gelApp.contact', []);

angular.module('gelApp.contact').controller('contactCtrl', ['$scope', '$http', function ($scope, $http) {

    //3. attach originalStudent model object
    $scope.originalStudent = {
        firstName: 'James',
        lastName: 'Bond',
        DoB: new Date('01/31/1980'),
        gender: 'male',
        trainingType: 'online',
        maths: false,
        physics: true,
        chemistry: true
    };

    //4. copy originalStudent to liquid. liquid will be bind to a form
    $scope.liquid = angular.copy($scope.originalStudent);

    //5. create submitStudentForm() function. This will be called when user submits the form
    $scope.submitStudnetForm = function () {

        var onSuccess = function (data, status, headers, config) {
            alert('Student saved successfully.');
        };

        var onError = function (data, status, headers, config) {
            alert('Error occured.');
        }

        $http.post('/liquid/submitData', { liquid:$scope.liquid })
            .success(onSuccess)
            .error(onError);

    };

    //6. create resetForm() function. This will be called on Reset button click.
    $scope.resetForm = function () {
        $scope.liquid = angular.copy($scope.OriginalStudent);
    };
}]);
