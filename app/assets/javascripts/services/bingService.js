angular.module('todoApp').factory('Bing', function($resource, $http) {
  var Bing;
  return Bing = (function() {
    function Bing(errorHandler) {
      var defaults;
      this.service = $resource('/api/bings/:id', {
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
    Bing.prototype.find = function(id, successHandler) {
      return this.service.get({
        id: id
      }, (function(bing) {
        if (typeof successHandler === "function") {
          successHandler(bing);
        }
        return bing;
      }), this.errorHandler);
    };
    return Bing;
  })();
});