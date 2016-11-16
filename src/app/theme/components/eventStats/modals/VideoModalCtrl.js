
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
    data.getSessionEmotionResults(data.currentSession.SessionName, function (result) {
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

    $scope.eventlabels = [];
    $scope.eventStatsData = [];
    $scope.eventseries = [];
    $scope.rawGraphData = data.currentSession.rawGraphData;
    //console.log(data.currentEvent.rawGraphData);

    var getDataSet = function (time) {
      var video = $scope.currentItem;
      var data = $scope.rawGraphData;
      var labels = [];
      for (var i = 0; i < data.Anger.length; ++i) {
        var videotime = data.Anger[i].Start / 10000;
        //if(videotime<time){
        labels.push(videotime);
        // }
        //if(i==data.Anger.length-1){
        //  labels.push(videotime);
        //}
      }

      var series = [];
      var graphData = [];
      for (var key in data) {
        series.push(key);
        var tempData = [];
        for (var i = 0; i < data[key].length; ++i) {
          var videotime = data[key][i].Start / 10000;
          if (videotime <= time)
            tempData.push(data[key][i].AverageFeelingValue * 100);
        }
        graphData.push(tempData);
      }
      console.log(graphData);
      if (time != 0) {
        try{
        $scope.eventlabels = labels;
        $scope.eventStatsData = series;
        $scope.eventseries = graphData;
        }
        catch(e){

        }
        //updateGraph(labels, series, graphData);
      }
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
