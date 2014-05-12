angular.module('todoApp').directive('editItemModal', function(broadcastService) {
	return {
		restrict: 'E',
		scope: {
			currentEditingItem: "=",
			onDeletePhoto: '&',
			onUpdatePhoto: '&',
			onDeleteVideo: '&',
			onUpdateVideo: '&'
		},
		templateUrl: '/templates/modals/edit_item_modal.html',
		link: function($scope, element, attrs) {
			
			$scope.editing = false;
			
			$scope.$on('editItem', function() {
				var editItem = broadcastService.editItemInformation.item;
				editItem.y = broadcastService.editItemInformation.y;
				editItem.x = broadcastService.editItemInformation.x;
				$scope.currentEditingItem = editItem;
				$scope.editing = true;
			});
			
			$scope.cancel = function() {
				$scope.editing = false;
			};
			
			$scope.deleteItem = function(currentItem) {
				$scope.editing = false;
				currentItem.cname == "photo" ? $scope.onDeletePhoto() : $scope.onDeleteVideo();
			};
			
			$scope.saveItem = function(currentItem) {
				$scope.editing = false;
				currentItem.cname == "photo" ? $scope.onUpdatePhoto() : $scope.onUpdateVideo();
			};
			
		}
	};
	
});