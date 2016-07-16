/**
 * @author v.lugovsky
 * created on 03.05.2016
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.theme')
    .service('dataServices', data);

  /** @ngInject */
  function data() {
    this.eventList = [
      {
        ID:1,
        EventName: 'Electronic Expo',
        StartDateTime: '2016/12/1 9:00 PM',
        EndDateTime: '2016/12/1 11:00 PM',
        Status: 'Waiting'
      },
      {
        ID:2,
        EventName: 'Medical conferences',
        StartDateTime: '2016/12/1 9:00 PM',
        EndDateTime: '2016/12/1 11:00 PM',
        Status: 'Waiting'
      }
    ];
    this.currentEvent = {
      id:2,
      event: 'Electronic Expo',
      startTime: '1st Dec 2016, 9:00PM',
      endTime: '1st Dec 2016, 11:00PM',
      status: 'Waiting'
    };
    this.deviceList = [];
    this.currentDevice = {};
  }
})();
