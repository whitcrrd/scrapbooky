angular.module('todoApp').directive('showVideoModal', function(broadcastService, $timeout, $rootScope) {
	return {
		restrict: 'E',
		scope: {
			currentItem: "=",
			showingItem: '='
		},
		templateUrl: '/templates/modals/show_video_modal.html',
	
		link: function($scope, element, attrs) {
			
			var showItemModal = angular.element(element.children()[0]),
			overlay = angular.element(element.find('#show-i-modal-overlay')[0]);
			
			$scope.$on('escapeKey', function() {
				if ($scope.showingItem == true) { $scope.showingItem = false; }
			});
												
			$scope.$watch('showingItem', function(showingItemBoolean) {
				showingItemBoolean == true ? $scope.showItem() : $scope.closeItem();
			});
			
			$scope.showItem = function() {
				overlay.addClass("active");
				showItemModal.addClass("effect1");
				$timeout(function() {
					showItemModal.addClass("showi");
				}, 50);
			};
			
			$scope.closeItem = function() {
				$scope.currentItem = {title: "", url: "", youtube_id: "", cname: "video"};
				$scope.showingItem = false;
				showItemModal.removeClass("showi");
				showItemModal.removeClass("effect1");
				overlay.removeClass("active");
			};
									
		}
	};
	
});