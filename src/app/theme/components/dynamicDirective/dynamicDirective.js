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
      link: function ($scope, $element, attr) {

        var pageAddEvents = [
          { name: 'add-event-create', css: 'col-md-6', directive: 'eventcreate' },
          { name: 'add-event-detail', css: 'col-md-6', directive: 'eventdetail' },
          { name: 'add-event-list', css: 'col-md-8', directive: 'eventlist' },
          { name: 'add-event-stats', css: 'col-md-8', directive: 'eventstats' }
        ];
        var currentPages = new Array();
        function registerEvent(eventName, css, directive) {         
          $scope.$on(eventName, function registerPageAddEvent() {
            $element
              .parent()
              .append($compile('<div class="' + css + '"><' + directive + '></' + directive + '></div>')($scope));
            $("#mainContainer").animate({ scrollLeft: $("#mainContainer").width() });
          });
        }
        
        pageAddEvents.forEach(function (value, index, array) {
          registerEvent(value.name, value.css, value.directive);
        });

        // $scope.$on('add-event-create', function (e) {
        //   console.log("Called me?");
        //   $element.parent().append($compile('<div class="col-md-6"><eventcreate></eventcreate></div>')($scope));
        //   $("#mainContainer").animate({ scrollLeft: $("#mainContainer").width() });
        // });

        // $scope.$on('add-event-detail', function (e) {
        //   console.log("Called me?");
        //   $element.parent().append($compile('<div class="col-md-6"><eventdetail></eventdetail></div>')($scope));
        //   $("#mainContainer").animate({ scrollLeft: $("#mainContainer").width() });
        // });

        // $scope.$on('add-event-list', function (e) {
        //   console.log("Called me?");
        //   $element.parent().append($compile('<div class="col-md-8"><eventlist></eventlist></div>')($scope));
        //   $("#mainContainer").animate({ scrollLeft: $("#mainContainer").width() });
        // });
        // $scope.$on('add-event-stats', function (e) {
        //   console.log("Called me?");
        //   $element.parent().append($compile('<div class="col-md-8"><eventstats></eventstats></div>')($scope));
        //   $("#mainContainer").animate({ scrollLeft: $("#mainContainer").width() });
        // });

        $scope.$watch(function () {
          $scope.activePageTitle = $state.current.title;
        });
      }
    };
  }

})();