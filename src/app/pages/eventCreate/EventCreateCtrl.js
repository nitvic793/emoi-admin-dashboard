/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.eventCreate')
    .controller('EventCreateCtrl', EventCreateCtrl);

  /** @ngInject */
  function EventCreateCtrl($scope, fileReader, $filter, $uibModal, $state) {

    $scope.addNewNode = function (params) {
      $scope.$broadcast('add-event-detail');
    };
    $scope.removePicture = function () {
      $scope.picture = $filter('appImage')('theme/no-photo.png');
      $scope.noPicture = true;
    };
    $scope.RemoveEventCreate = function () {
      $scope.$broadcast('remove-event-create');
      $state.go('dashboard');
    };

    $scope.removeEventDetail = function () {
      $scope.$broadcast('remove-event-detail');
    };

    $scope.theme = {
      color: 'red'
    };
  }

})();
