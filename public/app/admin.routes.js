angular.module('admin.routes', ['ngRoute'])
.config(function($routeProvider, $locationProvider) {
	$routeProvider
	// home page route
	.when('/', {
		templateUrl: 'app/views/admin_pages/main.html',
		controller: 'adminController',
		controllerAs: 'events'
	})
	// get rid of the hash in the URL
	$locationProvider.html5Mode(true);
});
