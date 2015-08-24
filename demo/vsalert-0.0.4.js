/* 
*  Name: vsalert 
*  Description: Alerting service - AngularJS reusable UI component 
*  Version: 0.0.4 
*  Author: kekeh 
*  Homepage: http://kekeh.github.io/vsalert 
*  License: MIT 
*  Date: 2015-08-24 
*/ 
angular.module('template-vsalert-0.0.4.html', []);


/**
 * @ngdoc object
 * @name vsalert
 * @description vsalert is module of the alert component.
 */
angular.module('vsalert', ["template-vsalert-0.0.4.html"])
/**
 * @ngdoc object
 * @name run
 * @description run adds the alert template to the template cache.
 */
    .run(['$templateCache', function ($templateCache) {
        $templateCache.put('vsalert.html', '<div class="vsalert"><span class="vsicon"></span><span class="vstext"></span></div>');
    }])
/**
 * @ngdoc object
 * @name vsalertConfig
 * @description vsalertConfig contain constants of the alerts.
 */
    .constant('vsalertConfig', {
        ALERT_VISIBLE_TIME: 5000, // in milliseconds
        ALERT_INFINITE_VISIBLE: 0,
        SHOW_ICON_ON_ALERT: true,
        ALERT_MARGIN: 5,
        SUCCESS: 'success',
        INFO: 'info',
        WARNING: 'warning',
        ERROR: 'error'
    })
/**
 * @ngdoc object
 * @name vsalert
 * @description vsalert is factory containing implementation of the alerts.
 */
    .factory('vsalert', ['$rootScope', '$compile', '$document', '$templateCache', '$http', '$interval', 'vsalertConfig', function ($rootScope, $compile, $document, $templateCache, $http, $interval, vsalertConfig) {
        var serviceObj = {};
        serviceObj.alert = function (alert) {
            $http.get('vsalert.html', {cache: $templateCache}).success(function (resp) {
                var visibleTime = !angular.isUndefined(alert.visibleTime) ? alert.visibleTime : vsalertConfig.ALERT_VISIBLE_TIME;
                var showIcon = !angular.isUndefined(alert.icon) ? alert.icon : vsalertConfig.SHOW_ICON_ON_ALERT;
                var alertElem = $compile(angular.element(resp))($rootScope.$new());

                setColors(alert);

                alertElem.css('top', getTopPos() + 'px');
                alertElem.css('right', vsalertConfig.ALERT_MARGIN + 'px');

                angular.element(alertElem.children()[1]).text(alert.message);
                alertElem.on('click', onAlertClick);
                body().append(alertElem);

                var interval = null;
                if (visibleTime > vsalertConfig.ALERT_INFINITE_VISIBLE) {
                    interval = $interval(function () {
                        unregisterEvent(alertElem);
                        alertElem.remove();
                        updatePositions();
                    }, visibleTime, 1);
                }

                function onAlertClick() {
                    if (interval !== null) {
                        $interval.cancel(interval);
                    }
                    unregisterEvent();
                    alertElem.remove()
                    updatePositions();
                }

                function unregisterEvent() {
                    alertElem.off('click', onAlertClick);
                }

                function body() {
                    return $document.find('body');
                }

                function getTopPos() {
                    var alerts = $document[0].querySelectorAll('.vsalert');
                    if(alerts.length === 0) {
                        return vsalertConfig.ALERT_MARGIN;
                    }
                    else {
                        var bottomAlert = angular.element(alerts[alerts.length - 1]);
                        return bottomAlert.prop('offsetTop')  + bottomAlert.prop('offsetHeight') + vsalertConfig.ALERT_MARGIN;
                    }
                }

                function updatePositions() {
                    var alerts = $document[0].querySelectorAll('.vsalert');
                    var topPos = vsalertConfig.ALERT_MARGIN;
                    angular.forEach(alerts, function (alert) {
                        alert = angular.element(alert);
                        alert.css('top', topPos + 'px');
                        topPos += alert.prop('offsetHeight') + vsalertConfig.ALERT_MARGIN;
                    });
                }

                function setColors(alert) {
                    alertElem.addClass('vsalert-' + alert.level.toLowerCase());
                    if (showIcon) {
                        angular.element(alertElem.children()[0]).addClass('icon-' + alert.level.toLowerCase());
                    }
                }
            });
        };
        return serviceObj;
    }]);




