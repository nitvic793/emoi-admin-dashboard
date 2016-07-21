/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard')
    .controller('DashboardCtrl', ['$scope','dataServices','$rootScope','$state',DashboardCtrl]);

  /** @ngInject */
  function DashboardCtrl($scope,data, $rootScope, $state) {
   console.log('test2');
    $scope.theme = {
      color:'green'
    };
    $rootScope.$state = $state;
    $rootScope.bodyStyle = {"background-color":'#20455A'};
    //#F0F3F4
    $scope.showSidebar = true;
    $scope.open = function (state) {
      $rootScope.bodyStyle = {"background-color":'#F0F3F4'};
    };

  }

})();
