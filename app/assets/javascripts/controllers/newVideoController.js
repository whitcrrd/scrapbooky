angular.module('todoApp').controller("newVideoController", function($scope, $timeout, $routeParams, Video, broadcastService) {
	
	serverErrorHandler = function() {
		return alert("There was a server error, please reload the page and try again.");
	};
	
	$scope.videoService = new Video($routeParams.book_id, serverErrorHandler);
	
	$scope.newVideo = {title: ""};
	
	$scope.createNewVideo = function() {
		return this.videoService.create({
			title: $scope.newVideo.title,
			url: $scope.newVideo.url,
			youtube_id: $scope.newVideo.youtube_id,
			start: $scope.newVideo.start,
			end: $scope.newVideo.end,
			book_id: $routeParams.book_id,
			row: 0,
			col: 0
		}, function(video) {
			broadcastService.broadcastNewBookItem(video);
		});
	};

});