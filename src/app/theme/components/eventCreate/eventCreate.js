/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.theme.components')
      .directive('eventcreate', eventCreate);

  /** @ngInject */
  function eventCreate($location, $state) {
    return {
      restrict: 'E',
      templateUrl: 'app/theme/components/eventCreate/eventCreate.html',
      link: function($scope, $element) {
        $scope.$on('remove-event-create', function(e){
          $element.parent().remove();
         // $element.remove();
        });
        $scope.$watch(function () {
          $scope.activePageTitle = $state.current.title;
        });
        $scope.createEvent = function name(params) {
          $scope.$broadcast('add-event-detail');
          $element.parent().remove();
        };
      }
    };
  }

})();