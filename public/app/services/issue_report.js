(function () {
    'use strict';

    angular
        .module('gelApp')
        .factory('IssueReportService', Service);

    function Service($http, $rootScope) {
        let service = {};

        service.save = save;

        return service;

        function save(report, callback) {
            let apiUrl = $rootScope.apiUrl + 'issueReport/';
            $http.post(apiUrl, {
                report: report
            })
                .then(function (response) {
                    console.log('success', response);

                    callback(response.status, response.data);
                })
                .catch(function(response) {
                    console.log('error', response);
                    callback(response.status, response.data);
                });
        }
    }
})();