angular.module('todoApp').factory('BookList', function($resource, $http) {
  var BookList;
  return BookList = (function() {
    function BookList(errorHandler) {
      var defaults;
      this.service = $resource('/api/book_lists/:id', {
        id: '@id'
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
	BookList.prototype.all = function() {
	  return this.service.query((function() {
	    return null;
	  }), this.errorHandler);
	};
    return BookList;
  })();
});