/**
 * @ngdoc object
 * @name vsalert
 * @description vsalert is module of the alert component.
 */
angular.module('vsalert', [])
        /**
         * @ngdoc object
         * @name run
         * @description run adds the alert template to the template cache.
         */
        .run(function ($templateCache) {
            $templateCache.put('vsalert.html', '<div class="vsalert"><span class="vsicon"></span><span class="vstext"></span></div>');
        })
        /**
         * @ngdoc object
         * @name vsalertConfig
         * @description vsalertConfig contain constants of the alerts.
         */
        .constant('vsalertConfig', {
            ALERT_VISIBLE_TIME: 5000, // in milliseconds 
            ALERT_POSITION: 2, // 1 = left, 2 = right
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
                        var nextTopPos = 0;
                        var timeout = !angular.isUndefined(alert.timeout) ? alert.timeout : vsalertConfig.ALERT_VISIBLE_TIME;
                        var showIcon = !angular.isUndefined(alert.icon) ? alert.icon : vsalertConfig.SHOW_ICON_ON_ALERT;
                        var scope = $rootScope.$new();
                        var bodyElem = body();
                        var alertElem = $compile(angular.element(resp))(scope);

                        if (vsalertConfig.ALERT_POSITION === 1) {
                            alertElem.css('left', (bodyElem[0].scrollLeft + vsalertConfig.ALERT_MARGIN) + 'px');
                        }
                        else {
                            alertElem.css('right', (-bodyElem[0].scrollLeft + vsalertConfig.ALERT_MARGIN) + 'px');
                        }

                        setColors(alert);
                        updatePosition();

                        alertElem.css('top', nextTopPos + 'px');
                        angular.element(alertElem.children()[1]).text(alert.message);
                        alertElem.on('click', onAlertClick);
                        bodyElem.append(alertElem);

                        var interval = $interval(function () {
                            unregisterEvent(alertElem);
                            alertElem.remove();
                            updatePosition();
                        }, timeout, 1);

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

                        function scrollTopPos() {
                            return body()[0].scrollTop;
                        }

                        function updatePosition() {
                            var alerts = $document[0].querySelectorAll('.vsalert');
                            nextTopPos = vsalertConfig.ALERT_MARGIN + scrollTopPos();
                            angular.forEach(alerts, function (alert) {
                                alert = angular.element(alert);
                                alert.css('top', nextTopPos + 'px');
                                nextTopPos += alert.prop('offsetHeight') + vsalertConfig.ALERT_MARGIN;
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




