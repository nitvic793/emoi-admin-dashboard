/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.eventList', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('eventList', {
          url: '/eventList',
          title: 'Event List',
          templateUrl: 'app/pages/eventList/eventList.html',
          controller: 'EventListCtrl',
          sidebarMeta:{
            icon:'ion-ios-list',
            order:900
          }
        });
  }

})();
