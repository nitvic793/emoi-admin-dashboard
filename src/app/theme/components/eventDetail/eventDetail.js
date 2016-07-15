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
      link: function ($scope, element) {
        $scope.$on('remove-event-detail', function (e) {
          element.parent().remove();
        });
        $scope.$watch(function () {
          $scope.activePageTitle = $state.current.title;
        });
        
        $scope.openStats = function openStatsPage() {
          $scope.$broadcast('add-event-stats');
        };
        $scope.close = function(){
          $scope.$broadcast('remove-event-detail');         
        };
        $scope.labels = ["Done", "Left"];
        $scope.data = [60, 40];
        $scope.options = {
          segmentShowStroke: false
        };
      }
    };
  }

})();