/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.eventStats', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('eventStats', {
          url: '/eventStats',
          title: 'Statistics',
          templateUrl: 'app/pages/eventStats/eventStats.html',
          controller: 'EventStatsCtrl',
          sidebarMeta:{
            order:1000
          }
        });
  }

})();
