/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.eventList')
    .controller('EventListCtrl', ['$scope','dataServices',EventListCtrl]);

  /** @ngInject */
  function EventListCtrl($scope,data) {

    $scope.theme = {
      color:'green'
    };
    
    $scope.Select = false;
    $scope.SelectAll = false;
    
    $scope.addNewNode = function (params) {
      $scope.$broadcast('add-event-detail');
    };
    $scope.removePicture = function () {
      $scope.picture = $filter('appImage')('theme/no-photo.png');
      $scope.noPicture = true;
    };
    $scope.RemoveEventCreate = function () {
      $scope.$broadcast('remove-event-create');
    };

    $scope.removeEventDetail = function () {
      $scope.$broadcast('remove-event-detail');
    };
    
    $scope.onEventItemClick = function(item){
      data.currentSession = item;
      data.currentEvent = item;
      $scope.$broadcast('add-event-detail');      
    };

     $scope.onAllEventSelectionChange = function(item){
      $scope.Select = ($scope.SelectAll ? true: false);
           
    };

  }

})();
