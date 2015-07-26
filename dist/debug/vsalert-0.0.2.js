/* 
*  Name: vsalert 
*  Description: Alerting service - AngularJS reusable UI component 
*  Version: 0.0.2 
*  Author: kekeh 
*  Homepage: http://kekeh.github.io/vsalert 
*  License: MIT 
*  Date: 2015-07-26 
*/ 
angular.module('template-vsalert-0.0.2.html', []);


/**
 * @ngdoc object
 * @name vsalert
 * @description vsalert is module of the alert component.
 */
angular.module('vsalert', ["template-vsalert-0.0.2.html"])
/**
 * @ngdoc object
 * @name run
 * @description run adds the alert template to the template cache.
 */
    .run(['$templateCache',function ($templateCache) {
        $templateCache.put('vsalert.html', '<div class="vsalert"><span class="vsicon"></span><span class="vstext"></span></div>');
    }])
/**
 * @ngdoc object
 * @name vsalertConfig
 * @description vsalertConfig contain constants of the alerts.
 */
    .constant('vsalertConfig', {
        ALERT_VISIBLE_TIME: 5000, // in milliseconds
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
                var position = {top: 0, right: 0};
                var visibleTime = !angular.isUndefined(alert.visibleTime) ? alert.visibleTime : vsalertConfig.ALERT_VISIBLE_TIME;
                var showIcon = !angular.isUndefined(alert.icon) ? alert.icon : vsalertConfig.SHOW_ICON_ON_ALERT;
                var scope = $rootScope.$new();
                var alertElem = $compile(angular.element(resp))(scope);

                setColors(alert);
                updatePosition();

                alertElem.css('top', position.top + 'px');
                alertElem.css('right', position.right + 'px');

                angular.element(alertElem.children()[1]).text(alert.message);
                alertElem.on('click', onAlertClick);
                body().append(alertElem);

                var interval = $interval(function () {
                    unregisterEvent(alertElem);
                    alertElem.remove();
                    updatePosition();
                }, visibleTime, 1);

                function onAlertClick() {
                    $interval.cancel(interval);
                    unregisterEvent();
                    alertElem.remove();
                    updatePosition();
                }

                function unregisterEvent() {
                    alertElem.off('click', onAlertClick);
                }

                function body() {
                    return $document.find('body');
                }

                function html() {
                    return $document.find('html');
                }

                function scrollTopPos() {
                    var tp = html()[0].scrollTop;
                    if (tp === 0) {
                        return body()[0].scrollTop;
                    }
                    return tp;
                }

                function scrollLeftPos() {
                    var lp = html()[0].scrollLeft;
                    if (lp === 0) {
                        return body()[0].scrollLeft;
                    }
                    return lp;
                }

                function updatePosition() {
                    var alerts = $document[0].querySelectorAll('.vsalert');
                    position.top = vsalertConfig.ALERT_MARGIN + scrollTopPos();
                    position.right = vsalertConfig.ALERT_MARGIN + -scrollLeftPos();
                    angular.forEach(alerts, function (alert) {
                        alert = angular.element(alert);
                        alert.css('top', position.top + 'px');
                        alert.css('right', position.right + 'px');
                        position.top += alert.prop('offsetHeight') + vsalertConfig.ALERT_MARGIN;
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




