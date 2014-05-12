angular.module('todoApp').controller("keypressController", function($scope, $rootScope) {
	$scope.keypressCallback = function($event) {
		if ($event.keyCode === 27) { $rootScope.$broadcast('escapeKey'); }
		$event.preventDefault();
	};
});