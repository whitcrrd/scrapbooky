angular.module('todoApp').directive('bingSearch', function($timeout, Bing, $rootScope) {
	return {
		restrict: 'E',
		scope: {
			onSave: '&',
			newPhotos: '=',
			bookEditableStatus: '='
		},
		templateUrl: '/templates/modals/bing_modal.html',
		link: function($scope, element, attrs) {
			Array.prototype.each_slice = function (size, callback){
			  for (var i = 0, l = this.length; i < l; i += size){
			    callback.call(this, this.slice(i, i + size));
			  }
			};
			
			$scope.formOpen = false;
			$scope.starting = true;
			$scope.searching = false;
			$scope.editing = false;
			$scope.bingSearch = "";
			$scope.bingPhotos = [];
			
			$scope.bingService = new Bing(serverErrorHandler);
			
			var overlay = angular.element(element.find('.sb-overlay-p')[0]),
			bingInputElement = angular.element(element.find('#bing-search-input')[0]),
			bingFormElement = angular.element(element.find('#n-pix-first')[0]),
			bingSecondElement = angular.element(element.find('#n-pix-second')[0]), 
			bingThirdElement = angular.element(element.find('#n-pix-third')[0]);
						
			
			$scope.$watch('starting', function(startingStatus) {
				startingStatus == true ? bingFormElement.addClass("active") : bingFormElement.removeClass("active");
			});
			
			$scope.$watch('searching', function(searchingStatus) {
				searchingStatus == true ? bingSecondElement.addClass("active") : bingSecondElement.removeClass("active");
			});
			
			$scope.$watch('editing', function(editingStatus) {
				editingStatus == true ? bingThirdElement.addClass("active") : bingThirdElement.removeClass("active");
			});
			
			$scope.openPhotoForm = function() {
				$scope.formOpen = true;
				overlay.addClass("open");
				bingInputElement.focus();
			};
			
			$scope.searchBing = function() {
				$scope.starting = false;
				$scope.searching = true;
				this.bingService.find($scope.bingSearch, function(bing) {
					$scope.bingPhotos = [];
					var bingImages = bing.images;
					bingImages.each_slice(6, function(photosRow) {
						$scope.bingPhotos.push(photosRow);
					});
				});
				
				return $scope.bingPhotos;
				
			};
			
			$scope.toggleSelection = function(photo) {
				$scope.newPhotos.indexOf(photo) >= 0 ? $scope.unselectPhoto(photo) : $scope.selectPhoto(photo);
			};
			
			$scope.selectPhoto = function(photo) {
				if ($scope.newPhotos.length === 4) { return false; }
				$scope.newPhotos.push(photo);
				photo.selected = "selected";
			};
			
			$scope.unselectPhoto = function(photo) {
				$scope.newPhotos.splice($scope.newPhotos.indexOf(photo), 1);
				photo.selected = "";
			};
			
			$scope.editTitles = function() {
				if ($scope.newPhotos.length === 0) { return false; }
				$scope.searching = false;
				$scope.editing = true;
			};
			
			$scope.savePhotos = function() {
				if ($scope.newPhotos.length === 0) { return false; }
				$scope.onSave();
				$scope.close();
			};
			
			$scope.close = function() {
				$scope.clearForm();
				overlay.removeClass("open");
			};
			
			$scope.$on('escapeKey', function() {
				if ($scope.formOpen == true) { $scope.close(); }
			});
			
			$scope.clearForm = function() {
				$scope.formOpen = false;
				$scope.searching = false;
				$scope.editing = false;
				$scope.starting = true;
				$scope.newPhotos = [];
				$scope.bingPhotos = [];
				$scope.bingSearch = "";
			};

		}
		
	};
	
	
});