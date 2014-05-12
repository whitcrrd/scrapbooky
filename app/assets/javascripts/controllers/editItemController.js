angular.module('todoApp').controller("editItemController", function($scope, $timeout, $routeParams, Video, Photo) {
	
	serverErrorHandler = function() {
		return alert("There was a server error, please reload the page and try again.");
	};
	
	$scope.photoService = new Photo($routeParams.book_id, serverErrorHandler);
	$scope.videoService = new Video($routeParams.book_id, serverErrorHandler);
	
	$scope.currentEditingItem = {};
	
    $scope.updatePhotoTitle = function() {
       this.photoService.update($scope.currentEditingItem, {
    	   title: $scope.currentEditingItem.title
       });
 	  $scope.currentEditingItem = {};
    };

    $scope.updateVideoTitle = function() {
       this.videoService.update($scope.currentEditingItem, {
    	   title: $scope.currentEditingItem.title	   	
       });
 	  $scope.currentEditingItem = {};
    };
		
    $scope.deleteCurrentPhoto = function() {
  	  this.photoService["delete"]($scope.currentEditingItem);
 	  $scope.bookItems.splice($scope.bookItems.indexOf($scope.currentEditingItem), 1);
 	  $scope.currentEditingItem = {};
    };
  
    $scope.deleteCurrentVideo = function() {
  	  this.videoService["delete"]($scope.currentEditingItem);
 	  $scope.bookItems.splice($scope.bookItems.indexOf($scope.currentEditingItem), 1);
 	  $scope.currentEditingItem = {};
    };
	
});