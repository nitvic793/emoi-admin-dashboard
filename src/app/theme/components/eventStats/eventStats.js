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
            setGraphForInterval(0, 5);
            $scope.slider = {
              minValue: 0,
              maxValue: 5,
              options: {
                floor: 0,
                ceil: sliderIntervals,
                step: 1,
                onChange: function () {
                  setGraphForInterval($scope.slider.minValue, $scope.slider.maxValue);
                }
              }
            };
            $scope.sliderIntervals = sliderIntervals;
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
        $scope.sliderIntervals = 10;

        var setGraphForInterval = function (start, end) {
          var data = $scope.rawGraphData;
          var labels = [];
          var series = [];
          var graphData = [];
          console.log(start, end, data);
          try {
            for (var i = start; i < end; ++i) {
              labels.push(data.Anger[i].Start / 10000);
            }

            for (var key in data) {
              series.push(key);
              var tempData = [];
              for (var i = start; i < end; ++i) {
                tempData.push(data[key][i].AverageFeelingValue * 100);
              }
              graphData.push(tempData);
            }
            $scope.eventlabels = labels;
            $scope.eventseries = series;
            $scope.eventStatsData = graphData;
          }
          catch (e) {
          }
          finally {
            if (!labels || labels.length == 0) {
              $scope.statsStatus = 'Nothing to show here :(';
            }
          }
        }
        $scope.exampleData = [];
        $scope.slider = {
          minValue: 0,
          maxValue: 5,
          options: {
            floor: 0,
            ceil: $scope.sliderIntervals,
            step: 1,
            onChange: function () {
              setGraphForInterval($scope.slider.minValue, $scope.slider.maxValue);
            }
          }
        };

        $scope.exampleData = [{
          "key": "Group 0",
          "values": [{ "x": 0.1905653578931545, "y": 0.8115218253543552, "size": 0.3461829945445061 }, { "x": -0.47275546081985614, "y": -0.21250610156481783, "size": 0.7597237343434244 }, { "x": -0.5943608400643436, "y": 0.48326260219425793, "size": 0.02735756477341056 }, { "x": 0.4529497407477123, "y": -0.2613829468206304, "size": 0.946700036060065 }, { "x": -0.7679040328935364, "y": -1.586936005594271, "size": 0.43301939661614597 }, { "x": -1.5731902534071192, "y": -0.09195950915659948, "size": 0.4368209659587592 }, { "x": 0.05553592818277685, "y": 1.742933013062792, "size": 0.8306681548710912 }, { "x": 1.1877814988973527, "y": -1.3711119089602777, "size": 0.8269749800674617 }, { "x": 0.3064363198255656, "y": -1.667839553436299, "size": 0.12198411440476775 }, { "x": -1.8983536631939086, "y": -0.30140817421374505, "size": 0.9157399751711637 }, { "x": 0.8488366723521106, "y": 1.295855799517563, "size": 0.962707610335201 }, { "x": 0.04917381379553963, "y": 0.1181675943613078, "size": 0.6471372074447572 }, { "x": 0.7289245491658888, "y": -1.437523544728938, "size": 0.11755557032302022 }, { "x": 0.5629218945450293, "y": -0.006342726461880527, "size": 0.4649628330953419 }, { "x": 0.8000392538355794, "y": -0.5021601017044044, "size": 0.6989645406138152 }, { "x": -0.023370322333300483, "y": 1.1371358097794941, "size": 0.6258520961273462 }, { "x": 0.7532529820424834, "y": -1.5173273652093129, "size": 0.8538876241073012 }, { "x": 1.9112037262708281, "y": -0.9995548189037156, "size": 0.9963174634613097 }, { "x": 0.9789011739485827, "y": -0.9841778566713231, "size": 0.7415103658568114 }, { "x": -0.7347622707954421, "y": 0.4025962928769507, "size": 0.6174976546317339 }, { "x": -0.5613983233476523, "y": 0.39581568123378746, "size": 0.26463790889829397 }, { "x": -0.05388729078366278, "y": 0.6683711793675684, "size": 0.10974680096842349 }, { "x": 1.6831239036269066, "y": -1.0049660895776276, "size": 0.24276677169837058 }, { "x": 0.5270582634376473, "y": -0.5988214257540422, "size": 0.5567773135844618 }, { "x": -0.5240116462616992, "y": 1.146009958570413, "size": 0.006196586648002267 }, { "x": -0.20812125647497828, "y": 0.6996467377096869, "size": 0.7625449288170785 }, { "x": 0.3697092607468307, "y": -0.561916499254294, "size": 0.8315129862166941 }, { "x": 0.19189187887399817, "y": -0.2128728937328294, "size": 0.2983735257294029 }, { "x": 0.7179505100531616, "y": 0.6074982425906404, "size": 0.9714579060673714 }, { "x": -1.0258042397131446, "y": 0.028916435404879495, "size": 0.9255245921667665 }, { "x": 0.049858130491165054, "y": 0.16023668632367177, "size": 0.24754037684760988 }, { "x": -0.4480373145257009, "y": -0.6809428379549302, "size": 0.3886829293332994 }, { "x": -2.2812991513382728, "y": -0.33079294312596536, "size": 0.9202477361541241 }, { "x": 0.8451574891358427, "y": 0.7672813961466449, "size": 0.5153329856693745 }, { "x": 0.9093939178973485, "y": -0.6761728190553149, "size": 0.782141275703907 }, { "x": 2.1503140852060727, "y": -0.9199074184181212, "size": 0.18787955376319587 }, { "x": -0.8493702928940353, "y": -1.9134660420041427, "size": 0.9342464371584356 }, { "x": 1.8426928208903286, "y": -1.2276238838923101, "size": 0.7361447520088404 }, { "x": -1.6394957638842569, "y": 1.1874215522015235, "size": 0.03339804639108479 }, { "x": -0.16743144480987487, "y": -1.3360786878739637, "size": 0.17817910155281425 }]
        }];

        $scope.rawGraphData = {};
        data.getEventResults(currentEvent.EventCode, function (data) {
          $scope.rawGraphData = data;
          console.log(data);
          setGraph(data);
        });

        $scope.graphState = 'Line';
        $scope.graphStateOption = 'Spider Graph Mode';
        $scope.toggleGraph = function () {
          $scope.graphState = ($scope.graphState == 'Line') ? 'Spider' : 'Line';
          $scope.graphStateOption = ($scope.graphState == 'Line') ? 'Spider Graph Mode' : 'Line Graph Mode';
        };

      }

    };
  }

})();