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
          { name: 'add-event-stats', css: 'col-md-8', directive: 'eventstats' },
          { name: 'add-device-list', css: 'col-md-6', directive: 'devicelist' },
          { name: 'add-device-event', css: 'col-md-6', directive: 'deviceaddtoevent' },
          { name: 'add-event-devices', css: 'col-md-6', directive: 'eventdevices' },
          { name: 'add-event-add-devices', css: 'col-md-6', directive: 'eventadddevices' }
        ];

        var pageRemoveEvents = [
          { name: 'remove-event-create', css: 'col-md-6', directive: 'eventcreate' },
          { name: 'remove-event-detail', css: 'col-md-6', directive: 'eventdetail' },
          { name: 'remove-event-list', css: 'col-md-8', directive: 'eventlist' },
          { name: 'remove-event-stats', css: 'col-md-8', directive: 'eventstats' },
          { name: 'remove-device-list', css: 'col-md-6', directive: 'devicelist' },
          { name: 'remove-device-event', css: 'col-md-6', directive: 'deviceaddtoevent' },
          { name: 'remove-event-devices', css: 'col-md-6', directive: 'eventdevices' },
          { name: 'remove-event-add-devices', css: 'col-md-6', directive: 'eventadddevices' }
        ];


        var currentPages = new Array();
        function registerEvent(eventName, css, directive) {
          $scope.$on(eventName, function registerPageAddEvent() {
            console.log(currentPages);
            if (currentPages[eventName]) {
              var prevInstance = eventName.replace('add', 'remove');
              $scope.$broadcast(prevInstance); //remove previous instance of tile page
            }
            else {
              currentPages[eventName] = true;
            }
            $element
              .parent()
              .append($compile('<div class="' + css + '"><' + directive + '></' + directive + '></div>')($scope));
            $("#mainContainer").animate({ scrollLeft: $("#mainContainer").width() });
          });
        }



        pageAddEvents.forEach(function (value, index, array) {
          registerEvent(value.name, value.css, value.directive);
        });

        pageRemoveEvents.forEach(function (value, index, array) {
          $scope.$on(value.eventName, function () {
            currentPages[eventName] = false;
            console.log(currentPages);
          });
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