angular.module('todoApp').controller("NavigationController", function($scope, $timeout, $routeParams, $location, broadcastService, $rootScope, BookList, User) {
	
	$scope.userEditable = false;
	$scope.bookEditableStatus = false;
	$scope.bookEditableStatusTitle = "EDIT";
	$scope.loadedMyBooks = false;
	$scope.myBooks = [];
	
	$scope.init = function() {		
		serverErrorHandler = function() {
			return alert("There was a server error, please reload the page and try again.");
		};
		this.bookListService = new BookList(serverErrorHandler);
		this.userService = new User(serverErrorHandler);
		this.userService.find(0, function(user) {
			$scope.currentUser = user;
			if ($scope.currentUser.id > 0) { $scope.fetchCurrentUserBooks(); }
		});
		return $scope.currentUser;
	};
	
	$scope.fetchCurrentUserBooks = function() {
		$scope.myBooks = this.bookListService.all();
		return $scope.myBooks;
	};
		
	$scope.$on('bookLoaded', function() {
		$scope.currentBook = broadcastService.loadedBook;
		$scope.resetNav();
		$scope.checkUserAccess();
	});
	
	$scope.resetNav = function() {
		$scope.bookEditableStatus = false;
		$scope.bookEditableStatusTitle = "EDIT";
	};
	
	$scope.checkUserAccess = function() {
		if ($scope.currentBook.user_editable == true && $scope.currentUser.id == $scope.currentBook.user_id) { $scope.userEditable = true; }
	};
	
	$scope.showDashboard = function() {
		$scope.userEditable = false;
		$location.path('/');
	};
		
	$scope.saveBookChanges = function() {
		broadcastService.broadcastBookSave();
	};
	
	$scope.initBookEdit = function() {
		broadcastService.broadcastBookEdit();
	};
				
});