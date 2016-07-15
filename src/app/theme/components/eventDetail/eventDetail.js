/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.theme.components')
      .directive('eventdetail', eventDetail);

  /** @ngInject */
  function eventDetail($location, $state) {
    return {
      restrict: 'E',
      templateUrl: 'app/theme/components/eventDetail/eventDetail.html',
      link: function($scope) {
         $scope.$on('remove-event-detail', function(e){
          element.remove();
        });
        $scope.$watch(function () {
          $scope.activePageTitle = $state.current.title;
        });
      }
    };
  }

})();