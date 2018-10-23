angular.module('gelApp.FooterController', []);

angular.module('gelApp.FooterController').controller('FooterController', ['$scope', '$translate', '$rootScope', '$uibModal',
    function ($scope, $translate, $rootScope, $uibModal) {
    $scope.reportIssue = function () {
        console.log("REPORT BUG");
        $uibModal.open({
            controller: 'reportIssueCtrl',
            templateUrl: 'app/modules/modals/report_issue/view.html',
            // backdrop: false
        })
            .result.then(function(location){
                if(location) {
                    console.log("works", location);
                    // $location.url('/' + location);
                }
            }, function(res){
                console.log("ERROR", res);
            }
        );
    }
    }]
);
