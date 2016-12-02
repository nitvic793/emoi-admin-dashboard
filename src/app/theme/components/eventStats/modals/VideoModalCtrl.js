
(function () {
  'use strict';

  angular.module('BlurAdmin.theme.components')
    .controller('VideoModalCtrl', VideoModalCtrl);

  /** @ngInject */
  function VideoModalCtrl($scope, $uibModal, dataServices, $sce) {
    var data = dataServices;
    $scope.currentEvent = dataServices.currentEvent;
    $scope.raw = "Loading...";
    $scope.mediaUrl = "";
    $scope.config = { sources: [] };
    $scope.config.theme = 'bower_components/videogular-themes-default/videogular.css'
<<<<<<< HEAD
    $scope.currentTime = 0;
    $scope.timeLeft = 0;
    $scope.eventlabels = [];
    $scope.eventStatsData = [];
    $scope.eventseries = [];
    $scope.rawGraphData = data.currentEvent.rawGraphData;
    $scope.config.height = 200;
    $scope.config.responsive = false;

    data.getEventEmotionResults(data.currentEvent.EventCode, function (result) {
=======
    data.getSessionEmotionResults(data.currentSession.SessionName, function (result) {
>>>>>>> e97e1fe5bf9734e196613bb40d2c9b7a71326f6c
      $scope.raw = result[0].MediaURL;
      console.log(result[0].MediaURL);
      var sources = [
        { src: result[0].MediaURL, type: "video/mp4" },
      ];
      $scope.config = { sources: sources };
      $scope.config.theme = 'bower_components/videogular-themes-default/videogular.css'
    });

    var updateGraph = function (labels, series, graphData, cb) {
      $scope.eventlabels = labels;
      $scope.eventStatsData = series;
      $scope.eventseries = graphData;
    }

<<<<<<< HEAD

=======
    $scope.eventlabels = [];
    $scope.eventStatsData = [];
    $scope.eventseries = [];
    $scope.rawGraphData = data.currentSession.rawGraphData;
    //console.log(data.currentEvent.rawGraphData);
>>>>>>> e97e1fe5bf9734e196613bb40d2c9b7a71326f6c

    var getDataSet = function (time) {
      var video = $scope.currentItem;
      var data = $scope.rawGraphData;
      var labels = [];
      var series = [];
      var graphData = [];
      for (var i = 0; i < data.Anger.length; ++i) {
        var secondDivideValue = 100000;
        var videotime = data.Anger[i].Start / secondDivideValue;
        //if(videotime<time){
        labels.push(videotime);
        // }
        //if(i==data.Anger.length-1){
        //  labels.push(videotime);
        //}
      }

      for (var key in data) {
        series.push(key);
        var tempData = [];
        for (var i = 0; i < data[key].length; ++i) {
<<<<<<< HEAD
          var videotime = data[key][i].Start / secondDivideValue;
=======
          var videotime = data[key][i].Start / 100000;
>>>>>>> e97e1fe5bf9734e196613bb40d2c9b7a71326f6c
          if (videotime <= time)
            tempData.push(data[key][i].AverageFeelingValue * 100);
        }
        graphData.push(tempData);
      }
<<<<<<< HEAD
      try {
        $scope.eventlabels = labels;
        $scope.eventseries = series;
        $scope.eventStatsData = graphData;
        // if (time != 0)
        //   updateGraph(labels, series, graphData);
      } catch (e) {

      }
=======
      console.log(graphData);

      try {
        $scope.eventlabels = labels;
        $scope.eventStatsData = graphData ;
        $scope.eventseries = series;
      }
      catch (e) {

      }
      //updateGraph(labels, series, graphData);

>>>>>>> e97e1fe5bf9734e196613bb40d2c9b7a71326f6c
    }

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
          labels.push(data.Anger[i].Start / 100000);
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
    };

    setGraph($scope.rawGraphData);

    $scope.onUpdate = function (time, duration) {
      console.log('test', time);
      var dataset = getDataSet(time);
    };
  }


})();
