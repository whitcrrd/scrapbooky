angular.module('todoApp').directive('editBox', function(broadcastService) {
	return {
		restrict: 'E',
		scope: {
			value: '=',
			editingStatus: '=',
			onShow: '&'
		},
		templateUrl: '/templates/directives/edit_box_directive.html',
		link: function($scope, element, attrs) {
			
			$scope.previewing = false;
			$scope.itemIcon = ($scope.value.cname == "photo" ? "picture" : "play-circle");
			var thisItem = angular.element(element.children()[0]);
			
			$scope.previewShow = function() {
				if ($scope.editingStatus == false) { $scope.previewing = true; }				
			};
			
			$scope.cancelPreviewShow = function() {
				if ($scope.editingStatus == false) { $scope.previewing = false; }
			};
			
			$scope.$watch('editingStatus', function(editingStatus) {
				editingStatus == false ? thisItem.addClass("show") : thisItem.removeClass("show");
			});
			
			$scope.clickedCog = function($event, value) {
				$event.stopPropagation();
				var editItemInformation = {item: value, x: $event.pageX - 5, y: $event.pageY - 8};
				broadcastService.prepForBroadcastEdit(editItemInformation);
			};
			
			$scope.showItem = function(item) {
				if ($scope.editingStatus == false) { $scope.onShow(item); }
			};

		}	
	};
	
});