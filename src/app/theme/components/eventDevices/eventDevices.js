/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function() {
    'use strict';

    angular.module('BlurAdmin.theme.components')
        .directive('eventdevices', ['$location', '$state', 'dataServices', eventDevices]);

    /** @ngInject */
    function eventDevices($location, $state, data) {
        return {
            restrict: 'E',
            templateUrl: 'app/theme/components/eventDevices/eventDevices.html',
            link: function($scope, element) {
                $scope.$on('remove-event-devices', function(e) {
                    element.parent().remove();
                });

                $scope.$watch(function() {
                    $scope.activePageTitle = $state.current.title;
                });

                $scope.openStats = function openStatsPage() {
                    $scope.$broadcast('add-event-stats');
                };

                $scope.openEventDevicesAdd = function openEventDevicesAddPage() {
                    $scope.$broadcast('add-event-add-devices');
                };

                $scope.closeEventDevices = function() {
                    $scope.$broadcast('remove-event-devices');
                };
                console.log('Devices for events', data.currentEvent.Devices);
                $scope.devices = data.currentEvent.Devices;
                $scope.$on('refresh', function() {
                    console.log('Refreshing...');
                    data.getEvents(function(events) {
                        events.forEach(function(e) {
                            if (e.ID == data.currentEvent.ID) {
                                data.currentEvent = e;
                                $scope.devices = e.Devices;
                            }
                        });
                        console.log(data.currentEvent.Devices);
                    });
                });
                
                $scope.startDevices = function(){
                  data.startDevicesForEvent(data.currentEvent.EventCode, function(response,err){
                    console.log('response', response, err);
                  });
                };
            }
        };
    }

})();