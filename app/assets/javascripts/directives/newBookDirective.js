angular.module('todoApp').directive('newBookPopover', function(broadcastService) {
	return {
		restrict: 'E',
		scope: {
			bookTitle: '=',
			onSave: '&'
		},
		templateUrl: '/templates/directives/new_book_popover.html',
		link: function($scope, element, attrs) {

			// random used to be the input, but not used anymore cause added children
			var newBookPopover = angular.element(element.children()[0]),
			random = angular.element(newBookPopover.children()[0]),
			inputElement = angular.element(random.children()[0]);
			
			$scope.viewingNewBookForm = false;
			
			$scope.viewNewBookForm = function() {
				$scope.viewingNewBookForm = true;
				newBookPopover.addClass('active');
				inputElement[0].focus();
			};
			
			$scope.closeNewBookForm = function() {
				$scope.bookTitle = '';
				$scope.viewingNewBookForm = false;
				newBookPopover.removeClass('active');
			};
			
			$scope.saveNewBook = function() {
				if ($scope.bookTitle == '') { $scope.bookTitle = "untitled"; }
				$scope.viewingNewBookForm = false;
				newBookPopover.removeClass('active');
				$scope.onSave();
			};
		}
	};
	
	
});