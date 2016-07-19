/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.theme.components')
    .directive('eventstats', ['$location', '$state', 'dataServices', eventStats]);

  /** @ngInject */
  function eventStats($location, $state, data) {
    return {
      restrict: 'E',
      templateUrl: 'app/theme/components/eventStats/eventStats.html',
      link: function ($scope, element) {
        $scope.$on('remove-event-stats', function (e) {
          element.parent().remove();
        });
        $scope.$watch(function () {
          $scope.activePageTitle = $state.current.title;
        });

        $scope.closeStats = function () {
          element.parent().remove();
        }

        $scope.addEventPage = function openCreateEventPage() {
          $scope.$broadcast('add-event-create');
        };

        var currentEvent = data.currentEvent;

        var updateGraph = function (labels, series, graphData, cb) {
          $scope.eventlabels = labels;
          $scope.eventStatsData = series;
          $scope.eventseries = graphData;
        }
        $scope.eventlabels = [];//["May", "June", "Jule", "August", "September", "October", "November"];
        $scope.eventStatsData = [];
        // $scope.eventStatsData = [
        //   [65, 59, 90, 81, 56, 55, 40],
        //   [28, 48, 40, 19, 88, 27, 45]
        // ];
        $scope.eventseries = [];//['Product A', 'Product B'];

        var setGraph = function setGraph(results, cb) {
          console.log(results);
          var data = results;
          var labels = [];
          // var sources = [
          //   { src: $sce.trustAsResourceUrl(results.MediaURL), type: "video/mp4" },
          // ];
          // $scope.config.sources = sources;
          // $scope.config.theme = 'bower_components/videogular-themes-default/videogular.css'
          for (var i = 0; i < data.Anger.length; ++i) {
            labels.push(data.Anger[i].Start / 10000);
          }
          var series = [];
          var graphData = [];
          for (var key in data) {
            series.push(key);
            var tempData = [];
            for (var i = 0; i < data[key].length; ++i) {
              tempData.push(data[key][i].AverageFeelingValue * 100);
            }
            graphData.push(tempData);
          }
          $scope.eventlabels = labels;
          $scope.eventseries = series;
          $scope.eventStatsData = graphData;
        };

        data.getEventResults(currentEvent.EventCode, function (data) {
          console.log(data);
          setGraph(data);
        });
      }

    };
  }

})();