angular.module('gelApp.reportIssue', []);

angular.module('gelApp.reportIssue').controller('reportIssueCtrl', ['$scope', '$uibModalInstance', '$timeout', 'IssueReportService', 'MyNotify',
    function ($scope, $uibModalInstance, $timeout, IssueReportService, MyNotify) {

    $scope.issueReport = {
        text: null,
        reportBack: null,
    };

    $scope.close = function(){
        $uibModalInstance.close();
    };

    $scope.saveIssueReport = function () {
        console.log("save issue", $scope.issueReport);
        IssueReportService.save($scope.issueReport, function (status, data) {
            MyNotify.notify(status, data);
            $uibModalInstance.close();
        })
    }
}]);
