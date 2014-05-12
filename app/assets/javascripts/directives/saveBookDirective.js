angular.module('todoApp').directive('editSaveBook', function(broadcastService, $timeout) {
	return {
		restrict: 'E',
		scope: {
			editingStatus: '=',
			bookEditableStatusTitle: '=',
			onSave: '&',
			onEdit: '&'
		},
		templateUrl: '/templates/directives/edit_save_book.html',
		link: function($scope, element, attrs) {
			
			$scope.toggleEditable = function() {
				$scope.editingStatus = !$scope.editingStatus;
				$scope.editingStatus == false ? $scope.setSaveMode() : $scope.setEditMode();
			};
			
			$scope.setEditMode = function() {
				$scope.bookEditableStatusTitle = "SAVE";
				$scope.onEdit();
			};
			
			$scope.setSaveMode = function() {
				$scope.bookEditableStatusTitle = "EDIT";
				$scope.onSave();
			};
		}
	};
	
	
});