/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.theme.components')
    .directive('devicelist', deviceList);

  /** @ngInject */
  function deviceList($location, $state) {
    return {
      restrict: 'E',
      templateUrl: 'app/theme/components/deviceList/deviceList.html',
      link: function ($scope, element) {
        $scope.$on('remove-device-list', function (e) {
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
            device: 'Device 001',
            status: 'Running',
            event: 'Evt1',
            isRunning: true
          },
          {
            device: 'Device 002',
            status: 'Waiting',
            event: '-'
          },
        ];
      }

    };
  }

})();