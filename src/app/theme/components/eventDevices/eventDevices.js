/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.theme.components')
    .directive('eventdevices', eventDevices);

  /** @ngInject */
  function eventDevices($location, $state) {
    return {
      restrict: 'E',
      templateUrl: 'app/theme/components/eventDevices/eventDevices.html',
      link: function ($scope, element) {
        $scope.$on('remove-event-devices', function (e) {
          element.parent().remove();
        });
        
        $scope.$watch(function () {
          $scope.activePageTitle = $state.current.title;
        });
        
        $scope.openStats = function openStatsPage() {
          $scope.$broadcast('add-event-stats');
        };
        
        $scope.openEventDevicesAdd = function openEventDevicesAddPage() {
          $scope.$broadcast('add-event-add-devices');
        };
        
        $scope.closeEventDevices = function(){
          $scope.$broadcast('remove-event-devices');         
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