
(function () {
  'use strict';

  angular.module('BlurAdmin.theme.components')
    .controller('VideoModalCtrl', VideoModalCtrl);

  /** @ngInject */
  function VideoModalCtrl($scope, $uibModal, dataServices) {
     var data = dataServices;
     $scope.currentEvent = dataServices.currentEvent;
  }


})();
