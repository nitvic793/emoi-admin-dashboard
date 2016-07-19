/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.theme.components')
    .directive('eventlist', ['$location', '$state', 'dataServices', eventlist]);

  /** @ngInject */
  function eventlist($location, $state, data) {
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

        $scope.eventList = data.eventList;
        var loadData = function () {
          data.getEvents(function (response) {
            $scope.eventList = data.eventList;
          });
        }
        loadData();
        $scope.refreshEventList = loadData;
      }

    };
  }

})();