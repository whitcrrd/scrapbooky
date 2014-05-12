angular.module('todoApp').factory('User', function($resource, $http) {
  var User;
  return User = (function() {
    function User(errorHandler) {
      var defaults;
      this.service = $resource('/api/users/:id', {
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
    User.prototype.find = function(id, successHandler) {
      return this.service.get({
        id: id
      }, (function(user) {
        if (typeof successHandler === "function") {
          successHandler(user);
        }
        return user;
      }), this.errorHandler);
    };
    return User;
  })();
});