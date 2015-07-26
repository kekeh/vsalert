describe('vsalert', function () {
    var service, scope;

    beforeEach(module('vsalert'));

    beforeEach(inject(function ($rootScope, $document, vsalert, vsalertConfig) {

        scope = $rootScope;
        service = vsalert;

        vsalertConfig.ALERT_VISIBLE_TIME = 5000;
        vsalertConfig.SHOW_ICON_ON_ALERT = true;


    }));

    it('should have an alert function', function () {
        expect(angular.isFunction(service.alert)).toBe(true);
    });

    it('success', function () {
        service.alert({level: 'success', message: 'success message.'});
    }, 4000);

    it('info', function () {
        service.alert({level: 'info', message: 'info message.'});
    }, 4000);

    it('warning', function () {
        service.alert({level: 'warning', message: 'warning message.'});
    }, 4000);

    it('error', function () {
        service.alert({level: 'error', message: 'error message.', visibleTime: 9000, icon: false});
    }, 4000);

});