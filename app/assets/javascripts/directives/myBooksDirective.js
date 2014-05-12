angular.module('todoApp').directive('myBooksPopover', function(broadcastService, $location) {
	return {
		restrict: 'E',
		scope: {
			books: '='
		},
		templateUrl: '/templates/directives/my_books_popover.html',
		link: function($scope, element, attrs) {
			
			$scope.viewingMyBooks = false;
			var myBooksPopover = angular.element(element.children()[0]);
			
			$scope.viewMyBooks = function() {
				$scope.viewingMyBooks = true;
				myBooksPopover.addClass('active');	
			};
			
			$scope.closeMyBooks = function() {
				$scope.viewingMyBooks = false;
				myBooksPopover.removeClass('active');
			};
			
			$scope.viewBook = function(book) {
				$scope.viewingMyBooks = false;
				myBooksPopover.removeClass('active');
				$location.path('/books/' + book.id);
			};
			
		}
	};
	
	
});