/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.theme.components')
    .directive('eventlist', ['$location', '$state', 'dataServices', 'toastr', 'toastrConfig', eventlist])

  /** @ngInject */
  function eventlist($location, $state, data, toastr, toastrConfig) {
    return {
      restrict: 'E',
      templateUrl: 'app/theme/components/eventList/eventList.html',
      link: function ($scope, element) {
        $scope.$on('remove-event-list', function (e) {
          $scope.count--;
          element.parent().remove();
        });
        $scope.$watch(function () {
          $scope.activePageTitle = $state.current.title;
        });

        $scope.addEventPage = function openCreateEventPage() {
          $scope.$broadcast('add-event-create');
        };

        $scope.eventList = data.eventList;
        var loadData = function () {
          data.getSessions(function (response) {
            $scope.eventList = data.sessionList;
          });
        }

        loadData();
        $scope.refreshEventList = loadData;
        $scope.selectAll = false;
        $scope.onEventSelectionChange = function () {
          console.log('test');
          if ($scope.selectAll) {
            for (var i = 0; i < $scope.eventList.length; ++i) {
              $scope.eventList[i].isSelected = true;
            }
          }
          else {
            for (var i = 0; i < $scope.eventList.length; ++i) {
              $scope.eventList[i].isSelected = false;
            }
          }
        };

        $scope.deleteSessions = function () {
          var toDelete = [];
          for (var i = 0; i < $scope.eventList.length; ++i) {
            if ($scope.eventList[i].isSelected) {
              toDelete.push($scope.eventList[i].SessionName);
            }
          }
          data.deleteSessions(toDelete, function (response, err) {
            console.log('Deleted :' + response, err, toDelete);
            if (err) {
              $scope.toastOptions.type = 'error';
              $scope.toastOptions.title = "Error";
              $scope.toastOptions.msg = err.data;
            }
            else{
              $scope.toastOptions.type = 'success';
              $scope.toastOptions.title = "Done";
              $scope.toastOptions.msg = "Successfully deleted.";
            }
            $scope.openToast();
            loadData();
          });
        };

        var defaultConfig = angular.copy(toastrConfig);
        $scope.types = ['success', 'error', 'info', 'warning'];
        var openedToasts = [];
        $scope.toastOptions = {
          autoDismiss: false,
          positionClass: 'toast-top-right',
          type: 'info',
          timeOut: '5000',
          extendedTimeOut: '2000',
          allowHtml: false,
          closeButton: false,
          tapToDismiss: true,
          progressBar: false,
          newestOnTop: true,
          maxOpened: 0,
          preventDuplicates: false,
          preventOpenDuplicates: false,
          title: "Some title here",
          msg: "Type your message here"
        };

        $scope.openToast = function () {
          angular.extend(toastrConfig, $scope.options);
          openedToasts.push(toastr[$scope.toastOptions.type]($scope.toastOptions.msg, $scope.toastOptions.title));
        };

        $scope.$on('$destroy', function iVeBeenDismissed() {
          angular.extend(toastrConfig, defaultConfig);
        })

      }

    };
  }


})();


