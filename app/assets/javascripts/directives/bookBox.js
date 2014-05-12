angular.module('todoApp').directive('bookBox', function(broadcastService, $location) {
	return {
		restrict: 'E',
		scope: {
			value: '='
		},
		templateUrl: '/templates/directives/book_box_directive.html',
		link: function($scope, element, attrs) {
			$scope.showingTitle = false;
			
			$scope.showBookTitle = function() {
				$scope.showingTitle = true;	
			};
			
			$scope.hideBookTitle = function() {
				$scope.showingTitle = false;
			};
			
			$scope.viewBook = function(item) {
				$location.path('/books/' + item.book_id);
			};
			
		}	
	};
	
});