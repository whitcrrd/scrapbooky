angular.module('todoApp').controller("itemPositionController", function($scope, $timeout, $routeParams, Video, Photo) {
	
	serverErrorHandler = function() {
		return alert("There was a server error, please reload the page and try again.");
	};
	
	$scope.photoService = new Photo($routeParams.book_id, serverErrorHandler);
	$scope.videoService = new Video($routeParams.book_id, serverErrorHandler);
	
	$scope.$on('broadcastBookSave', function() {
		$scope.saveBook();
	});
	
	$scope.saveBook = function() {
		angular.forEach($scope.bookItems, function(item) {
			item.cname == "photo" ? $scope.updatePhotoPositionAndSize(item) : $scope.updateVideoPositionAndSize(item);
		});
	};
         
	$scope.updatePhotoPositionAndSize = function(photo) {
		this.photoService.update(photo, {
		   sizeX: photo.sizeX,
		   sizeY: photo.sizeY,
		   row: photo.row,
		   col: photo.col
	   });   	
   };
   
   $scope.updateVideoPositionAndSize = function(video) {
	   this.videoService.update(video, {
		   sizeX: video.sizeX,
		   sizeY: video.sizeY,
		   row: video.row,
		   col: video.col
	   });
   };
   	
});