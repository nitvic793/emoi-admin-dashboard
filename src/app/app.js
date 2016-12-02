'use strict';

angular.module('BlurAdmin', [
  "com.2fdevs.videogular",
  "com.2fdevs.videogular.plugins.controls",
  "com.2fdevs.videogular.plugins.overlayplay",
  "com.2fdevs.videogular.plugins.poster",
  "com.2fdevs.videogular.plugins.buffering",
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
  'angularSpinner',

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
  })
  .config(['ChartJsProvider', function (ChartJsProvider) {
    // Configure all charts
    ChartJsProvider.setOptions({
      colours: ['#FF5252', '#FF8A80'],
      responsive: true
    });
    // Configure all line charts
    ChartJsProvider.setOptions('Line', {
      animation: false,
      labelsFilter: function (value, index) {
        return (index + 1) % 5 !== 0;
      }
    });
  }]);