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
          $scope.count--;
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
        $scope.statsStatus = "Loading...";
        var setGraph = function setGraph(results, cb) {
          var data = results;
          var labels = [];
          var series = [];
          var graphData = [];
          var spiderData = [];
          var spiderSeries = [];
          console.log(results);
          try {
            for (var i = 0; i < data.Anger.length; ++i) {
              labels.push(data.Anger[i].Start / 10000);
            }
            var sliderIntervals = data.Anger.length;

            for (var key in data) {
              series.push(key);
              if (key != 'Neutral') {
                spiderSeries.push(key);
              }
              var tempData = [];
              for (var i = 0; i < data[key].length; ++i) {
                if (!spiderData[i] && key != 'Neutral') {
                  spiderData[i] = [];
                }
                if (key != 'Neutral') {
                  spiderData[i].push(data[key][i].AverageFeelingValue * 100);
                }
                tempData.push(data[key][i].AverageFeelingValue * 100);
              }
              graphData.push(tempData);
            }
            $scope.spiderMasterData = spiderData;
            $scope.spiderLabels = spiderSeries;
            $scope.eventlabels = labels;
            $scope.eventseries = series;
            $scope.eventStatsData = graphData;
            $scope.spiderData = [spiderData[0]];

            $scope.spiderSlider = {
              value: 0,
              options: {
                floor: 0,
                ceil: sliderIntervals,
                step: 1,
                minLimit: 0,
                maxLimit: sliderIntervals,
                onChange: function () {
                  console.log('Slider change', $scope.spiderSlider);
                  var index = $scope.spiderSlider.value;
                  $scope.spiderData = [$scope.spiderMasterData[index]];
                }
              }
            };
          }
          catch (e) {
          }
          finally {
            if (!labels || labels.length == 0) {
              $scope.statsStatus = 'Nothing to show here :(';
            }
          }

        };

        data.getEventResults(currentEvent.EventCode, function (data) {
          console.log(data);
          setGraph(data);
        });
        $scope.slider = {
          value: 50,
          options: {
            floor: 0,
            ceil: 100,
            step: 1,
            minLimit: 0,
            maxLimit: 90
          }
        };
        
        $scope.graphState = 'Line';
        $scope.graphStateOption = 'Line Graph Mode';
        $scope.toggleGraph = function(){
          $scope.graphState = ($scope.graphState=='Line')?'Spider':'Line';
          $scope.graphStateOption = ($scope.graphState=='Line')?'Spider Graph Mode':'Line Graph Mode';
        };
      }

    };
  }

})();