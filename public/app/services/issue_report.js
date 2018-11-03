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
            console.log($http.defaults.headers.common.Authorization)
            let apiUrl = $rootScope.apiUrl + 'issueReport';
            let params = {
                text: report.text,
                reportBack: report.reportBack
            };
            $http.post(apiUrl, params)
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