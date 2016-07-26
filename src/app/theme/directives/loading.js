/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.theme')
    .directive('loading', ['$http',loading]);

  /** @ngInject */
  function loading($http) {
    return {
      restrict: 'A',
      link: function (scope, elm, attrs) {
        scope.isLoading = function () {
          return $http.pendingRequests.length > 0;
        };

        scope.$watch(scope.isLoading, function (v) {
          if (v) {
            elm.show();
          } else {
            elm.hide();
          }
        });
      }
    };

  }

})();
