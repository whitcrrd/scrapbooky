angular.module('todoApp').directive('videoSearch', function($timeout, youtubeSearch, $rootScope) {
	return {
		restrict: 'E',
		scope: {
			video: '=',
			onSave: '&',
			bookEditableStatus: '='
		},
		templateUrl: '/templates/modals/video_search_modal.html',
		link: function($scope, element, attrs) {
			
			$scope.emptyVideo = {title: "", youtube_id: "", url: ""};
			$scope.videos = [];
			$scope.search = "";
			$scope.iframeLoaded = false;
			$scope.selectedVideo = false;
			$scope.formOpen = false;
			$scope.orderby = "relevance";
			$scope.closeStatus = "close";
			$scope.openStatus = "notOpen";
			
			var searchInputElement = angular.element('#n-vid-search')[0],
			titleInputElement = angular.element('#n-vid-title-input')[0],
			vidPreviewElement = angular.element('#n-vid-preview')[0],
			overlay = angular.element(element.find('.sb-overlay')[0]),
			relevanceBtn = angular.element(element.find('#p-relevance')[0]),
			viewCountBtn = angular.element(element.find('#p-view-count')[0]);
			
			$scope.openVideoForm = function() {
				overlay.addClass("open");
				$scope.formOpen = true;
				searchInputElement.focus();
			};
			
			$scope.setOrderRelevance = function() {
				$scope.orderby = "relevance";
				relevanceBtn.addClass("active");
				viewCountBtn.removeClass("active");
			};
			
			$scope.setOrderViewCount = function() {
				$scope.orderby = "viewCount";
				viewCountBtn.addClass("active");
				relevanceBtn.removeClass("active");
			};
			
			$scope.searchYoutube = function() {
				var promise = youtubeSearch.getYoutubeData($scope.search, $scope.orderby);
				promise.then(function (videosData) {
					$scope.videos = [];
					angular.forEach(videosData, function(video) {
						var searchVideo = $scope.parseYoutubeResponse(video);
						$scope.videos.push(searchVideo);
					});
				}, true);
			};
			
			$scope.parseYoutubeResponse = function(youtubeVideo) {
				return {
					title: youtubeVideo.title.$t,
					thumbnail: youtubeVideo.media$group.media$thumbnail[0].url,
	                url: youtubeVideo.link[0].href,
					duration: youtubeVideo.media$group.media$content[0].duration,
	                videoId: youtubeVideo.link[0].href.match(/^http:\/\/www\.youtube\.com\/.*[?&]v=([^&]+)/i)[1],
					viewCount: youtubeVideo.yt$statistics.viewCount,
					rating: youtubeVideo.gd$rating.average,
					start: 0,
					end: youtubeVideo.media$group.media$content[0].duration
				}
			};
			
			$scope.selectVideo = function(videoSearchResult) {
				$scope.selectedVideo = true;
				$scope.video = {
					title: videoSearchResult.title,
					youtube_id: videoSearchResult.videoId,
					url: videoSearchResult.thumbnail,
					start: videoSearchResult.start,
					end: videoSearchResult.end,
					duration: videoSearchResult.duration
				};
				if ($scope.iframeLoaded == true) { $scope.removePreview(); }
			};
			
			$scope.preview = function() {
				if ($scope.iframeLoaded == true) { $scope.removePreview(); }
				$scope.turl = "http://www.youtube.com/embed/" + $scope.video.youtube_id + "?start=" + $scope.video.start + "&end=" + $scope.video.end + "&controls=0&autoplay=1&rel=0";
				var iframe = angular.element('<iframe id="v-preview-iframe" type="text/html" width="90%" height="90%" src=' + $scope.turl + ' frameborder="0"></iframe>')[0];
				vidPreviewElement.appendChild(iframe);
				$scope.iframeLoaded = true;
			};
			
			$scope.removePreview = function() {
				var iframe = angular.element('#v-preview-iframe')[0];
				vidPreviewElement.removeChild(iframe);
				$scope.iframeLoaded = false;
			};
			
			$scope.save = function() {
				$scope.checkVideoTimes();
				$scope.onSave();
				$scope.close();
			};
			
			$scope.checkVideoTimes = function() {
				if ($scope.video.end < $scope.video.start) { $scope.video.end = $scope.video.duration; }
				if ($scope.video.end > $scope.video.duration) { $scope.video.end = $scope.video.duration; }
			};
			
			$scope.clearForm = function() {
				if ($scope.iframeLoaded == true) { $scope.removePreview(); }
				$scope.setOrderRelevance();
				$scope.formOpen = false;
				$scope.selectedVideo = false;
				$scope.video = $scope.emptyVideo;
				$scope.videos = [];
				$scope.search = "";
			};
						
			$scope.close = function() {
				$scope.clearForm();
				overlay.removeClass("open");
			};
			
			$scope.$on('escapeKey', function() {
				if ($scope.formOpen == true) { $scope.close(); }
			});
		}
		
	};
	
	
});