angular.module('todoApp').factory('Photo', function($resource, $http) {
  var Photo;
  return Photo = (function() {
    function Photo(errorHandler) {
      var defaults;
		  this.service = $resource('/api/books/:book_id/photos/:id', {
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
    Photo.prototype.create = function(attrs, successHandler) {
      return new this.service({
        photo: attrs,
		book_id: attrs.book_id
      }).$save((function(photo) {
        return successHandler(photo);
      }), this.errorHandler);
    };
    Photo.prototype["delete"] = function(photo) {
      return new this.service().$delete({
        id: photo.id,
		book_id: photo.book_id
      }, (function() {
        return null;
      }), this.errorHandler);
    };
    Photo.prototype.update = function(photo, attrs) {
      return new this.service({
        photo: attrs
      }).$update({
        id: photo.id,
		book_id: photo.book_id
      }, (function() {
        return null;
      }), this.errorHandler);
    };
    return Photo;
  })();
});