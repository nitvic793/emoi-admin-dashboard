/**
 * @author v.lugovsky
 * created on 03.05.2016
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.theme')
        .service('dataServices', ['$http', '$rootScope', data]);
    var base = 'http://emoiwebapi.azurewebsites.net/api/';
    var config = {
        events: base + 'events',
        devices: base + 'devices',
        sessions: base + 'session'
    };

    /** @ngInject */
    function data($http, $rootScope) {
        var self = this;
        $rootScope.data = self;
        this.eventList = [];
        this.currentEvent = {};
        this.currentSession = {};
        this.deviceList = [];
        this.currentDevice = {};
        this.freeDevices = [];
        this.sessionList = [];

        function get(url, cb) {
            $http.get(url)
                .then(function (data) {
                    cb(data.data);
                })
                .catch(function (err) {
                    cb(null, err);
                });
        }

        function post(url, data, cb) {
            $http.post(url, data)
                .then(function (data) {
                    cb(data.data);
                })
                .catch(function (err) {
                    cb(null, err);
                });;
        }

        function httpDelete(url, data, cb) {
            var config = {
                data: data,
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            $http.delete(url, config)
                .then(function (data) {
                    cb(data);
                })
                .catch(function (err) {
                    cb(null, err);
                });;
        }

        this.getEvents = function (cb) {
            var f = this;
            f.cb = cb;
            get(config.events, function (data) {
                self.eventList = data;
                if (f.cb) {
                    f.cb(data);
                }
            });
        };

         this.getSessions = function (cb) {
            var f = this;
            f.cb = cb;
            get(config.sessions, function (data) {
                self.sessionList = data;
                if (f.cb) {
                    f.cb(data);
                }
            });
        };

        this.createEvent = function (event, cb) {
            post(config.events, event, function (data) {
                self.eventList.push(data);
                cb(data);
            });
        }

        this.getFreeDevices = function (cb) {
            get(config.devices + '/status/free', function (data) {
                self.freeDevices = data;
                if (cb) {
                    cb(data);
                }
            })
        }

        this.addDevicesToEvent = function (eventCode, devices, cb) {
            post(config.devices + '/addToEvent', {
                'EventCode': eventCode,
                DeviceIdList: devices
            }, function (data) {
                if (cb) {
                    cb(data);
                }
            });
        };

        this.getAllDevices = function (cb) {
            get(config.devices, function (data) {
                self.deviceList = data;
                if (cb) {
                    cb(data);
                }
            });
        };

        this.getEvent = function (id, cb) {
            get(config.events + '/' + id, function (data) {
                self.currentEvent = data;
                if (cb) {
                    cb(data);
                }
            });
        };

        this.startDevicesForEvent = function (eventCode, cb) {
            post(config.devices + '/StartForEvent/' + eventCode, {}, function (data, err) {
                console.log('Start Devices', data);
                if (cb) {
                    cb(data, err);
                }
            });
        };

        this.stopDevicesForEvent = function (eventCode, cb) {
            post(config.devices + '/StopForEvent/' + eventCode, {}, function (data, err) {
                console.log('Stop Devices', data);
                if (cb) {
                    cb(data, err);
                }
            });
        };

        this.startDevices = function (deviceList, cb) {
            post(config.devices + '/Start', deviceList, function (data, err) {
                if (cb) {
                    cb(data);
                }
            });
        };

        this.stopDevices = function (deviceList, cb) {
            post(config.devices + '/Stop', deviceList, function (data, err) {
                if (cb) {
                    cb(data);
                }
            });
        };

        this.getEventResults = function (eventCode, cb) {
            get(config.events + '/result/' + eventCode, function (data, err) {
                if (cb) {
                    cb(data);
                }
            });
        };

        this.getEventEmotionResults = function (eventCode, cb) {
            get(config.events + '/emotionMap/' + eventCode, function (data, err) {
                if (cb) {
                    cb(data);
                }
            });
        };

        this.getSessionEmotionResults = function (eventCode, cb) {
            get(config.sessions + '/emotionMap/' + eventCode, function (data, err) {
                if (cb) {
                    cb(data);
                }
            });
        };


        this.deleteEvents = function (eventCodes, cb) {
            httpDelete(config.events, eventCodes, function (data, err) {
                if (cb) {
                    cb(data, err);
                }
            });
        }

        this.updateEvent = function (event, cb) {
            post(config.events + '/edit', event, cb);
        }

        this.getEvents();
        this.getFreeDevices();
        this.getAllDevices();
    }
})();
