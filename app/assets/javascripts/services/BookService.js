angular.module('todoApp').factory('Book', function($resource, $http) {
  var Book;
  return Book = (function() {
    function Book(errorHandler) {
      var defaults;
      this.service = $resource('/api/books/:id', {
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
    Book.prototype.create = function(attrs, successHandler) {
      return new this.service({
        book: attrs
      }).$save((function(book) {
        return successHandler(book);
      }), this.errorHandler);
    };
    Book.prototype["delete"] = function(book) {
      return new this.service().$delete({
        id: book.id
      }, (function() {
        return null;
      }), this.errorHandler);
    };
    Book.prototype.update = function(book, attrs) {
      return new this.service({
        book: attrs
      }).$update({
        id: book.id
      }, (function() {
        return null;
      }), this.errorHandler);
    };
    Book.prototype.all = function() {
      return this.service.query((function() {
        return null;
      }), this.errorHandler);
    };
    Book.prototype.find = function(id, successHandler) {
      return this.service.get({
        id: id
      }, (function(book) {
        if (typeof successHandler === "function") {
          successHandler(book);
        }
        return book;
      }), this.errorHandler);
    };
    return Book;
  })();
});