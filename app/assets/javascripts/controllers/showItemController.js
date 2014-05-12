angular.module('todoApp').controller("showItemController", function($scope, $timeout) {
	
	$scope.showingVideoItem = false;
	$scope.showingPhotoItem = false;
	$scope.currentPhotoItem = {};
	$scope.currentVideoItem = {};
		
	$scope.$on('showItem', function(event, item) {
		item.cname == "photo" ? $scope.showPhoto(item) : $scope.showVideo(item);
	});
				
	$scope.showVideo = function(item) {		
		$scope.removePreviouslyShownPhoto();
		$scope.currentVideoItem = item;
		$scope.showingVideoItem = true;
	};
		
	$scope.showPhoto = function(item) {
		$scope.removePreviouslyShownVideo();
		$scope.currentPhotoItem = item;
		$scope.showingPhotoItem = true;
	};
	
	$scope.removePreviouslyShownPhoto = function() {
		$scope.showingPhotoItem = false;
		$scope.currentPhotoItem = {};
	};
	
	$scope.removePreviouslyShownVideo = function() {
		$scope.showingVideoItem = false;
		$scope.currentVideoItem = {};
	};
	
});