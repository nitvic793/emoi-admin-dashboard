/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.theme.components')
    .directive('eventlist', eventlist);

  /** @ngInject */
  function eventlist($location, $state) {
    return {
      restrict: 'E',
      templateUrl: 'app/theme/components/eventList/eventList.html',
      link: function ($scope, element) {
        $scope.$on('remove-event-list', function (e) {
          element.parent().remove();
        });
        $scope.$watch(function () {
          $scope.activePageTitle = $state.current.title;
        });
        
        $scope.addEventPage = function openCreateEventPage() {
          $scope.$broadcast('add-event-create');
        };
        
        $scope.metricsTableData = [
          {
            event: 'Electronic Expo',
            startTime: '1st Dec 2016, 9:00PM',
            endTime: '1st Dec 2016, 11:00PM',
            status: 'Waiting'
          },
          {
            event: 'Medical conferences',
            startTime: '1st Dec 2016, 9:00PM',
            endTime: '1st Dec 2016, 11:00PM',
            status: 'Waiting'
          },
        ];
      }

    };
  }

})();