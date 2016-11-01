
(function () {
  'use strict';

  angular.module('BlurAdmin.theme.components')
    .controller('VideoModalCtrl', VideoModalCtrl);

  /** @ngInject */
  function VideoModalCtrl($scope, $uibModal, dataServices) {
     var data = dataServices;
     $scope.currentEvent = dataServices.currentEvent;
     $scope.raw = "Loading...";
     data.getEventEmotionResults(data.currentEvent.EventCode, function(result){
         $scope.raw = result[0].MediaURL;
     });
  }


})();
