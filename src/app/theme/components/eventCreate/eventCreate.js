/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.theme.components')
    .directive('eventcreate', ['$location', '$state', 'dataServices', eventCreate]);

  /** @ngInject */
  function eventCreate($location, $state, data) {
    return {
      restrict: 'E',
      templateUrl: 'app/theme/components/eventCreate/eventCreate.html',
      link: function ($scope, $element) {
        $scope.$on('remove-event-create', function (e) {
          $element.parent().remove();
          // $element.remove();
        });
        $scope.$watch(function () {
          $scope.activePageTitle = $state.current.title;
        });
        $scope.newEvent = {};
        $scope.createEvent = function name(params) {
          $scope.newEvent.StartDateTime = $('#datetimepicker1').find("input").val();
          $scope.newEvent.EndDateTime = $('#datetimepicker2').find("input").val();
          console.log($scope.newEvent);
          data.createEvent($scope.newEvent, function (event) {
            console.log(event);
            data.currentEvent = event;
            $scope.$broadcast('add-event-detail');
            $element.parent().remove();
          });
        };
        data.getEvents();
      }
    };
  }

})();