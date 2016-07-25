'use strict';

angular.module('BlurAdmin', [
  'ngAnimate',
  'ui.bootstrap',
  'ui.sortable',
  'ui.router',
  'ngTouch',
  'toastr',
  'smart-table',
  "xeditable",
  'ui.slimscroll',
  'ngJsTree',
  'angular-progress-button-styles',
  'rzModule',
  'nvd3ChartDirectives',

  'BlurAdmin.theme',
  'BlurAdmin.pages'
])
  .controller('MainCtrl', function ($scope, $rootScope, $state) {
    console.log($state.current);
    $rootScope.showSidebar = true;
    if ($state.current.name == 'dashboard') {
      $rootScope.showSidebar = false;
    }
    //$rootScope.bodyStyle = { "background-color": '#010B3D' };
    $rootScope.$on('$stateChangeStart',
      function (event, toState, toParams, fromState, fromParams) {
        console.log(toState);
        $rootScope.bodyStyle = { "background-color": '#F0F3F4' };

        if (toState.name == 'dashboard') {
          $rootScope.showSidebar = false;
        }
        else {
          $rootScope.showSidebar = true;
        }
      })
  });