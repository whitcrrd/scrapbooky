angular.module('todoApp').factory('BookBoard', function($resource, $http) {
  var BookBoard;
  return BookBoard = (function() {
    function BookBoard(errorHandler) {
      var defaults;
      this.service = $resource('/api/book_boards/:id', {
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
	BookBoard.prototype.all = function() {
	  return this.service.query((function() {
	    return null;
	  }), this.errorHandler);
	};
    return BookBoard;
  })();
});