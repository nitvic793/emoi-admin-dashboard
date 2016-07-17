/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function() {
    'use strict';

    angular.module('BlurAdmin.theme.components')
        .directive('devicelist', ['$location', '$state', 'dataServices', deviceList]);

    /** @ngInject */
    function deviceList($location, $state, data) {
        return {
            restrict: 'E',
            templateUrl: 'app/theme/components/deviceList/deviceList.html',
            link: function($scope, element) {
                $scope.$on('remove-device-list', function(e) {
                    element.parent().remove();
                });
                $scope.$watch(function() {
                    $scope.activePageTitle = $state.current.title;
                });

                $scope.addEventPage = function openCreateEventPage() {
                    $scope.$broadcast('add-event-create');
                };

                $scope.deviceList = data.deviceList;

                var loadData = function() {
                    data.getAllDevices(function(data) {
                        $scope.deviceList = data;
                    });
                };
                
                loadData();
                
                $scope.addDeviceToEvent = function(device) {
                    data.currentDevice = device;
                    $scope.$broadcast('add-device-event');
                };
                
                $scope.$on('refresh', function(){
                  loadData();
                });
            }

        };
    }

})();