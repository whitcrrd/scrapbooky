angular.module('todoApp').factory('Video', function($resource, $http) {
  var Video;
  return Video = (function() {
    function Video(errorHandler) {
      var defaults;
		  this.service = $resource('/api/books/:book_id/videos/:id', {
        id: '@id',
		book_id: '@book_id'
      }, {
        update: {
          method: 'PATCH'
        }
      });
      this.errorHandler = errorHandler;
      defaults = $http.defaults.headers;
      defaults.patch = defaults.patch || {};
      defaults.patch['Content-Type'] = 'application/json';
    }
    Video.prototype.create = function(attrs, successHandler) {
      return new this.service({
        video: attrs,
		book_id: attrs.book_id
      }).$save((function(video) {
        return successHandler(video);
      }), this.errorHandler);
    };
    Video.prototype["delete"] = function(video) {
      return new this.service().$delete({
        id: video.id,
		book_id: video.book_id
      }, (function() {
        return null;
      }), this.errorHandler);
    };
    Video.prototype.update = function(video, attrs) {
      return new this.service({
        video: attrs
      }).$update({
        id: video.id,
		book_id: video.book_id
      }, (function() {
        return null;
      }), this.errorHandler);
    };
    return Video;
  })();
});