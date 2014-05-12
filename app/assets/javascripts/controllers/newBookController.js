angular.module('todoApp').controller("newBookController", function($scope, $timeout, $routeParams, $location, Book, $rootScope) {
	
	$scope.newBook = {title: ""};
	
	serverErrorHandler = function() {
		return alert("There was a server error, please reload the page and try again.");
	};
	
	$scope.bookService = new Book(serverErrorHandler);
	
	$scope.createNewBook = function() {
		return this.bookService.create({
			title: $scope.newBook.title
		}, function(book) {
			$scope.myBooks.push(book);
			$scope.newBook.title = "";
			$location.path('/books/' + book.id);
		});
	};
	
});