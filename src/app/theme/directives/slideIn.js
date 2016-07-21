/**
 * Animated load block
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.theme')
      .directive('slidein', slideIn);

  /** @ngInject */
  function slideIn($timeout, $rootScope) {
    return {
      restrict: 'A',
      link: function ($scope, elem) {
        var delay = 1000;

        if ($rootScope.$pageFinishedLoading) {
          delay = 100;
        }

        $timeout(function () {
          elem.removeClass('full-invisible');
          elem.addClass('animated slideInUp');
        }, delay);
      }
    };
  }

})();