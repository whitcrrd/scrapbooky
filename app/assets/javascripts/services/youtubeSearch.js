angular.module('todoApp').factory('youtubeSearch', function($q, $http) {
	
	return { 
		getYoutubeData: function(search, orderby) {
			var deferred = $q.defer();
			var url = "http://gdata.youtube.com/feeds/api/videos?q=" + search + "&alt=json&max-results=8&start-index=1&orderby=" + orderby + "&callback=JSON_CALLBACK";
			$http.jsonp(url).success(function(json) {
				var videos = json.feed.entry;
				deferred.resolve(videos);
			}).error(function(error) {
				console.log(JSON.stringify(error));
			});
			return deferred.promise;
		}
	};
	
});