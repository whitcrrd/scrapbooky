angular.module('todoApp').controller("newPhotoController", function($scope, $timeout, $routeParams, Photo, broadcastService) {
	
	serverErrorHandler = function() {
		return alert("There was a server error, please reload the page and try again.");
	};
	
	$scope.photoService = new Photo($routeParams.book_id, serverErrorHandler);	
	
	$scope.newPhotos = [];
	
	$scope.createNewPhotos = function() {
		angular.forEach($scope.newPhotos, function(newPhoto) {
			$scope.createNewPhoto(newPhoto);
		});
	};
	
	$scope.createNewPhoto = function(newPhoto) {
		return this.photoService.create({
			title: newPhoto.title,
			url: newPhoto.url,
			book_id: $routeParams.book_id,
			row: 0,
			col: 0
		}, function(photo) {
			broadcastService.broadcastNewBookItem(photo);
		});
	};
		
});