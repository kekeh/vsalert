# vsalert v. 0.0.4

**Alerting service - AngularJS reusable UI component**

## Description
Simple AngularJS service which implements the alert system. This component depends on only the AngularJS.

## Usage

* include the **vsalert-0.0.4.min.js** and the **vsalert-0.0.4.min.css** files into your project. See the **Build project** and the **Installation** chapters below.
```html
<script src="vsalert-0.0.4.min.js"></script>
<link href="vsalert-0.0.4.min.css" rel="stylesheet" type="text/css">
```
* inject the **vsalert** module into your application module.
* and inject the **vsalert** service into each controller which is using alerting system.
* and inject the **vsalertConfig** constants in one place.
```js
var sampleapp = angular.module('sampleapp', ['vsalert']);
sampleapp.controller('samplectrl', function ($scope, vsalert, vsalertConfig) {
    ...
});
```

### Javascript example
```js
var sampleapp = angular.module('sampleapp', ['vsalert']);
sampleapp.controller('sampleappctrl', function ($scope, vsalert, vsalertConfig) {

    // Set configuration of alerts
    vsalertConfig.ALERT_VISIBLE_TIME = 5000;    // milliseconds - also possible to optionally give within alert data (see below visibleTime)
    vsalertConfig.SHOW_ICON_ON_ALERT = true;    // show icon or not - also possible to optionally give within alert data (see below icon)
    
    function sendAlert() {
        vsalert.alert({
            level: 'info', 
            message: 'Suspendisse facilisis nulla.', 
            visibleTime: 8000, 
            icon: true
            });
    
    }

```


#### vsalert

By injecting the **vsalert** is possible to send alerts to the service by calling the **alert** function.

* parameter to the **alert** function is a javascript object. See below.
```js
    {
        level: 'info', 
        message: 'Download file failed!', 
        visibleTime: 8000, 
        icon: true
    }
```

| Parameter | Type | Description | Mandatory | 
| :------------ |:---------------|:---------------|:---------------|
| level | string | Level of the alert. Can be on of the following string: **success**, **info**, **warning** or **error** | yes |
| message | string | Message of the alert shown on the UI. | yes |
| visibleTime | number | Milliseconds on how long time the alert is visible on the UI. If not given the default (5000 ms) or **vsalertConfig** configured value is used. If given value is zero, the alert is visible infinite and it can be closed by clicking it. | no |
| icon | boolean | Is icon shown or not on the UI. If not given the default **true** or **vsalertConfig** configured value is used. | no |


#### vsalertConfig

By injecting the **vsalertConfig** is possible to set configuration data dynamically. See above.


## Demo
In the **examples** folder of this project has the sample application and the online demo is [here](http://kekeh.github.io/vsalert)

## Dependencies
Depends on only the AngularJS. Implemented using the AngularJS version 1.4.3.

## Build project
* Build can be done by executing the **grunt** command. It creates the **dist/debug** and the **dist/min** folders and put files to these folders.
```js
grunt
```

## Installation
* Installation can be done using the **bower**. It installs files from the **dist/debug** and the **dist/min** folders. Needed CSS and javascript files are located in these folders.
```js
bower install vsalert
```

## Compatibility (tested with)
* IE 9+
* Firefox 36
* Google Chrome 41
* Opera 28.0
* Mobile Safari 8

## License
* License: MIT

## Author
* Author: kekeh