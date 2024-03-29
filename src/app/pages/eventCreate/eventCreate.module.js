/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.eventCreate', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('eventCreate', {
          url: '/eventCreate',
          title: 'Create Event',
          templateUrl: 'app/pages/eventCreate/eventCreate.html',
          controller: 'EventCreateCtrl',
          sidebarMeta:{
            icon:'ion-wand',
            order:800
          }
        });
  }

})();
