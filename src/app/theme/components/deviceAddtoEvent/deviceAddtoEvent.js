/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.theme.components')
    .directive('deviceaddtoevent', ['$location', '$state', 'dataServices', deviceAddtoEvent]);

  /** @ngInject */
  function deviceAddtoEvent($location, $state, data) {
    return {
      restrict: 'E',
      templateUrl: 'app/theme/components/deviceAddtoEvent/deviceAddtoEvent.html',
      link: function ($scope, element) {
        $scope.$on('remove-device-event', function (e) {
          element.parent().remove();
        });
        $scope.$watch(function () {
          $scope.activePageTitle = $state.current.title;
        });

        $scope.addEventPage = function openCreateEventPage() {
          $scope.$broadcast('add-event-create');
        };

        $scope.closeDeviceEvent = function () {
          $scope.$broadcast('remove-device-event');
        };

        $scope.currentDevice = data.currentDevice;
        $scope.currentEvent = data.currentEvent;
        $scope.onOptionChange = function () {
          console.log($scope.currentEvent);
          data.currentEvent = $scope.currentEvent;
        };
        
        $scope.addToEvent = function(){
          var eventCode = $scope.currentEvent.EventCode;
          var deviceId = $scope.currentDevice.DeviceID;
          data.addDevicesToEvent(eventCode, [deviceId], function(response){
            console.log('response', response);
            $scope.refreshDevices();
            $scope.$broadcast('refresh');
            $scope.closeDeviceEvent();
          });
        }
        
        $scope.refreshDevices = function(){
          data.getAllDevices();
        }
        $scope.data = data;
        console.log($scope.data);

      }

    };
  }

})();