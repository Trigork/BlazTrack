var app = angular.module('blaztrack', [
	'ngAnimate',
	'ngScrollbars',
	'app.routes',
	'eventsCtrl',
	'profilesCtrl',
	'rosterCtrl',
	'standingsCtrl'
]);
app.config(function (ScrollBarsProvider) {
    // the following settings are defined for all scrollbars unless the
    // scrollbar has local scope configuration
    ScrollBarsProvider.defaults = {
        scrollButtons: {
            scrollAmount: 'auto', // scroll amount when button pressed
            enable: true // enable scrolling buttons by default
        },
        scrollInertia: 0, // adjust however you want
        axis: 'y', // enable 2 axis scrollbars by default,
        theme: 'minimal',
        autoHideScrollbar: true
    };
});
