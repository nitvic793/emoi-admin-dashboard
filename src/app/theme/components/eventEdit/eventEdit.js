/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.theme.components')
    .directive('eventedit', ['$location', '$state', 'dataServices', '$rootScope', eventEdit]);

  /** @ngInject */
  function eventEdit($location, $state, data, $rootScope) {
    return {
      restrict: 'E',
      templateUrl: 'app/theme/components/eventEdit/eventEdit.html',
      link: function ($scope, $element) {
        $scope.$on('remove-event-edit', function (e) {
          $scope.count--;
          console.log($scope.count);
          $element.parent().remove();

        });
        $scope.$watch(function () {
          $scope.activePageTitle = $state.current.title;
        });
        $scope.status = '';
        $scope.newEvent = data.currentEvent;
        
        $scope.RemoveEventEdit = function(){
          $scope.$broadcast('remove-event-edit');
        };

        function isUpperCase(str) {
          return true;
        }
        function empty(str) {
          if (typeof str == 'undefined' || !str || str.length === 0 || str === "" || !/[^\s]/.test(str) || /^\s*$/.test(str) || str.replace(/\s/g, "") === "") {
            return true;
          }
          else {
            return false;
          }
        }
        $scope.showStatus = false;
        $scope.createEvent = function name(params) {
          $scope.showStatus = false;
          $scope.newEvent.StartDateTime = $('#datetimepicker1').find("input").val();
          $scope.newEvent.EndDateTime = $('#datetimepicker2').find("input").val();
          var start = moment($scope.newEvent.StartDateTime);
          var end = moment($scope.newEvent.EndDateTime);
          var showStatus = false;
          if (empty($scope.newEvent.EventName)) {
            $scope.status = 'Enter valid Event Name';
            $scope.showStatus = true;
            return;
          }
          if (empty($scope.newEvent.EventCode)) {
            $scope.showStatus = true;
            $scope.status = 'Event valid event code';
            return;
          }
          if (!isUpperCase($scope.newEvent.EventCode)) {
            $scope.showStatus = true;
            $scope.status = 'Event Code has to be in Upper Case.';
            return;
          }
          if (!$scope.newEvent.StartDateTime || !$scope.newEvent.EndDateTime) {
            $scope.showStatus = true;
            $scope.status = 'Please enter valid date time values';
            return;
          }
          console.log(start.isAfter(end), start, end);
          if (start.isAfter(end)) {
            $scope.showStatus = true;
            $scope.status = 'Please enter valid date time values';
            return;
          }
          console.log($scope.newEvent);
          data.updateEvent($scope.newEvent, function (event) {
            console.log(event);
            data.currentEvent = event;
            $scope.$broadcast('add-event-detail');
            $scope.$broadcast('refresh');
            $element.parent().remove();
          });
        };
        data.getEvents();
      }
    };
  }

})();