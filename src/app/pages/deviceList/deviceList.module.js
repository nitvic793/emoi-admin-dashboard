/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.deviceList', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('deviceList', {
          url: '/deviceList',
          title: 'Devices',
          templateUrl: 'app/pages/deviceList/deviceList.html',
          controller: 'DeviceListCtrl',
          sidebarMeta:{
            icon:'ion-videocamera',
            order:1000
          }
        });
  }

})();
