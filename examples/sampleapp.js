var sampleapp = angular.module('sampleapp', ['vsalert']);
sampleapp.controller('samplectrl', function ($scope, vsalert, vsalertConfig) {

    // Set configuration of alerts
    vsalertConfig.ALERT_VISIBLE_TIME = 5000;    // milliseconds - also possible to optionally give within alert data (see below visibleTime)
    vsalertConfig.SHOW_ICON_ON_ALERT = true;    // show icon or not - also possible to optionally give within alert data (see below icon)


    $scope.alertSuccess = function () {
        vsalert.alert({
            level: 'success',
            message: 'Success message. Mauris sed libero. Suspendisse facilisis nulla in lacinia laoreet, lorem velit accumsan velit vel mattis libero nisl et sem.'
        });
    };

    $scope.alertInfo = function () {
        vsalert.alert({
            level: 'info',
            message: 'Info message. Suspendisse facilisis nulla.',
            visibleTime: 8000,
            icon: true
        });
    };

    $scope.alertWarning = function () {
        vsalert.alert({level: 'warning', message: 'Warning message. Lorem velit accumsan velit vel.'});
    };

    $scope.alertError = function () {
        vsalert.alert({level: 'error', message: 'Error message. Mattis libero nisl et sem.'});
    };

});



