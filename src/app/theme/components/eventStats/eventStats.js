/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.theme.components')
    .directive('eventstats', eventStats);

  /** @ngInject */
  function eventStats($location, $state) {
    return {
      restrict: 'E',
      templateUrl: 'app/theme/components/eventStats/eventStats.html',
      link: function ($scope, element) {
        $scope.$on('remove-event-stats', function (e) {
          element.parent().remove();
        });
        $scope.$watch(function () {
          $scope.activePageTitle = $state.current.title;
        });
        
        $scope.closeStats = function(){
          element.parent().remove();          
        }
        
        $scope.addEventPage = function openCreateEventPage() {
          $scope.$broadcast('add-event-create');
        };

        $scope.eventlabels = ["May", "June", "Jule", "August", "September", "October", "November"];
        $scope.eventStatsData = [
          [65, 59, 90, 81, 56, 55, 40],
          [28, 48, 40, 19, 88, 27, 45]
        ];
        $scope.eventseries = ['Product A', 'Product B'];
      }

    };
  }

})();