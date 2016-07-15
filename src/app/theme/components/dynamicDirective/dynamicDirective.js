/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.theme.components')
      .directive('dynamicdirective', dynamicDirective);

  /** @ngInject */
  function dynamicDirective($location, $state, $compile) {
    return {
      restrict: 'E',
      templateUrl: 'app/theme/components/dynamicDirective/dynamicDirective.html',
      link: function($scope, $element, attr) {
        $scope.$on('add-event-create', function(e) {
          console.log("Called me?");
          $element.append($compile('<eventcreate></eventcreate>')($scope));
        });
        
        $scope.$on('add-event-detail', function(e) {
          console.log("Called me?");
          $element.append($compile('<eventdetail></eventdetail>')($scope));
        });
        
        $scope.$watch(function () {
          $scope.activePageTitle = $state.current.title;
        });
      }
    };
  }

})();