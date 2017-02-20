angular.module('app.routes', ['ngRoute'])
.config(function($routeProvider, $locationProvider) {
	$routeProvider
	// home page route
	.when('/events', {
		templateUrl: 'app/views/pages/events.html',
		controller: 'eventsController',
		controllerAs: 'events'
	})
	.when('/standings', {
		templateUrl: 'app/views/pages/standings.html',
		controller: 'standingsController',
		controllerAs: 'standings'
	})
	.when('/roster', {
		templateUrl: 'app/views/pages/roster.html',
		controller: 'rosterController',
		controllerAs: 'roster'
	})
	.when('/profiles', {
		templateUrl: 'app/views/pages/profiles.html',
		controller: 'profilesController',
		controllerAs: 'profiles'
	})
	.otherwise({
		templateUrl: 'app/views/pages/events.html',
		controller: 'eventsController',
		controllerAs: 'events'
	})
	// get rid of the hash in the URL
	$locationProvider.html5Mode(true);
});
