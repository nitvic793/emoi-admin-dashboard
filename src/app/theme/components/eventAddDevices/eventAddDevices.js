/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function() {
    'use strict';

    angular.module('BlurAdmin.theme.components')
        .directive('eventadddevices', ['$location', '$state', 'dataServices', eventAddDevices]);

    /** @ngInject */
    function eventAddDevices($location, $state, data) {
        return {
            restrict: 'E',
            templateUrl: 'app/theme/components/eventAddDevices/eventAddDevices.html',
            link: function($scope, element) {
                var deviceIds = [];
                $scope.freeDevices = data.freeDevices;
                var loadData = function() {
                    data.getFreeDevices(function(devices) {
                        data.freeDevices.forEach(function(val, i, arr) {
                            val.toAdd = false;
                        });
                        console.log('Done');
                        $scope.freeDevices = data.freeDevices;
                    });
                };
                
                loadData();
                $scope.refreshFreeDevices = function(){
                    loadData();
                };
                
                $scope.$on('remove-event-add-devices', function(e) {
                    element.parent().remove();
                });
                $scope.$watch(function() {
                    $scope.activePageTitle = $state.current.title;
                });

                $scope.openStats = function openStatsPage() {
                    $scope.$broadcast('add-event-stats');
                };
                $scope.closeEventAddDevices = function() {
                    console.log('Check');
                    for (var i = 0; i < data.freeDevices.length; ++i) {
                        if (data.freeDevices[i].toAdd) {
                            deviceIds.push(data.freeDevices[i].DeviceID);
                        }
                    }
                    data.addDevicesToEvent(data.currentEvent.EventCode, deviceIds, function(data) {
                        console.log(data);
                        $scope.$broadcast('refresh');
                    });
                    $scope.$broadcast('remove-event-add-devices');
                };

            }
        };
    }

})();