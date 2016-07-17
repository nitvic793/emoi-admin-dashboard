/**
 * @author v.lugovsky
 * created on 03.05.2016
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.theme')
    .service('dataServices', ['$http', data]);
  var base = 'http://localhost:10395/api/';
  var config = {
    events: base + 'events',
    devices: base + 'devices'
  };

  /** @ngInject */
  function data($http) {
    var self = this;
    this.eventList = [];
    this.currentEvent = {};
    this.deviceList = [];
    this.currentDevice = {};

    function get(url, cb) {
      $http.get(url)
        .then(function (data) {
          cb(data.data);
        });
    }
    
    function post(url, data, cb){
      $http.post(url,data)
      .then(function(data){
        cb(data.data);
      });
    }

    this.getEvents = function (cb) {
      get(config.events, function (data) {
        self.eventList = data;
      });
    };
    
    this.createEvent = function(event, cb){
      post(config.events, event, function(data){
        self.eventList.push(data);
        cb(data);
      });
    }
    
    this.getEvents();
  }
})();
