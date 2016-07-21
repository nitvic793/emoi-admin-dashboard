/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.theme.components')
    .directive('eventdetail', ['$location', '$state', 'dataServices', eventDetail]);

  /** @ngInject */
  function eventDetail($location, $state, data) {
    return {
      restrict: 'E',
      templateUrl: 'app/theme/components/eventDetail/eventDetail.html',
      link: function ($scope, element) {
        $scope.$on('remove-event-detail', function (e) {
          $scope.count--;
          element.parent().remove();

        });
        $scope.$watch(function () {
          $scope.activePageTitle = $state.current.title;
        });
        
        $scope.editEvent = function(){
          $scope.$broadcast('add-event-edit');
          $scope.$broadcast('remove-event-detail');
        };
        
        $scope.openStats = function openStatsPage() {
          $scope.$broadcast('add-event-stats');
        };

        $scope.openEventDevices = function openEventDevicesPage() {
          $scope.$broadcast('add-event-devices');
        };

        $scope.closeEventDetails = function () {
          $scope.$broadcast('remove-event-detail');
        };

        $scope.$on('refresh', function () {
          data.getEvent(data.currentEvent.ID);
        });

        $scope.event = data.currentEvent;
        var current = moment();
        $scope.statusBox = 'info';
        $scope.startDate = data.currentEvent.StartDateTime;
        $scope.endDate = data.currentEvent.EndDateTime;
        var done = 0;
        var left = 100;
        var start = moment($scope.startDate);
        var end = moment($scope.endDate);
        var duration = end.diff(start);
        var status = 'Not Running';
        $scope.status = status;
        console.log(duration);
        current = moment();
        if (current.isAfter(start) && current.isBefore(end)) {
          console.log("Running");
          var elapsed = end.diff(current);
          var percentage = (elapsed / duration) * 100;
          left = percentage;
          done = 100 - percentage;
          console.log(left, done);
          status = 'Running';
          $scope.statusBox = 'danger';
        }
        else if (current.isAfter(end)) {
          console.log('Done');
          done = 100;
          left = 0;
          status = 'Done';
          $scope.statusBox = 'success';
        }
        else {
          console.log('Not started');
          status = 'Not Started';
          left = 100;
          done = 0;
        }

        $scope.status = status;
        $scope.labels = ["Left", "Done"];
        $scope.data = [left, done];
        $scope.colors = ['#c0c0c0', '#32cd32']
        $scope.options = {
          segmentShowStroke: false
        };
      }
    };
  }

})();