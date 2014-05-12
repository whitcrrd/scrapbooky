var todoApp;
todoApp = angular.module('todoApp', ['ngResource', 'ui.bootstrap', 'ui.keypress', 'gridster']);
todoApp.config(function($httpProvider) {
  var authToken;
  authToken = $("meta[name=\"csrf-token\"]").attr("content");
  return $httpProvider.defaults.headers.common["X-CSRF-TOKEN"] = authToken;
});
todoApp.config(function($routeProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
  $routeProvider.when('/', {
    redirectTo: '/dashboard'
  });
  $routeProvider.when('/dashboard', {
    templateUrl: '/templates/dashboard.html',
    controller: 'DashboardController'
  });
  return $routeProvider.when('/books/:book_id', {
	  templateUrl: '/templates/book.html',
	  controller: 'ShowPageController'
  });
});
$(document).on('page:load', function() {
	
  return $('[ng-app]').each(function() {
    var module;
    module = $(this).attr('ng-app');
    return angular.bootstrap(this, [module]);
  });
});