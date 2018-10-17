(function () {
    'use strict';

    angular
        .module('gelApp')
        .factory('MyNotify', Service);

    function Service($http, $rootScope) {
        let service = {};

        service.notify = notify;

        return service;

        function notify(notification, type) {
            let notificationClass;
            if (type > 0 && type < 200) {
                notificationClass = 'alert alert-info';
            } else if (type >= 200 && type < 300) {
                notificationClass = 'alert alert-success';
            } else if (type >= 400 && type < 500) {
                notificationClass = 'alert alert-warning';
            } else if (type >= 500) {
                notificationClass = 'alert alert-danger';
            } else if (type < 0) {
                notificationClass = 'alert alert-warning';
                notification = "Something went wrong, please try again.";
            }

            // Create alert div
            let div = document.createElement("div");
            div.className = notificationClass;

            // Fill alert div
            div.innerHTML = notification;
            let divId = Math.floor(Math.random()*(9999+1));
            div.id = divId;
            document.getElementById("messages").appendChild(div);

            // Create timeout hide for alert
            setTimeout(function(){
                document.getElementById(divId).remove();
            }, 4000);

        }
    }
})();