/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
        
        app.startMonitoringBeacon();
    },
    startMonitoringBeacon: function(){
      console.log('START MONITORING BEACON !');
      var logToDom = function (message) {
        var e = document.createElement('label');
        e.innerText = message;

        var br = document.createElement('br');
        var br2 = document.createElement('br');
        document.body.appendChild(e);
        document.body.appendChild(br);
        document.body.appendChild(br2);

        window.scrollTo(0, window.document.height);
      };

      var delegate = new cordova.plugins.locationManager.Delegate().implement({

          didDetermineStateForRegion: function (pluginResult) {

              logToDom('[DOM] didDetermineStateForRegion: ' + JSON.stringify(pluginResult));

              cordova.plugins.locationManager.appendToDeviceLog('[DOM] didDetermineStateForRegion: '
                  + JSON.stringify(pluginResult));
          },

          didStartMonitoringForRegion: function (pluginResult) {
              console.log('didStartMonitoringForRegion:', pluginResult);

              logToDom('didStartMonitoringForRegion:' + JSON.stringify(pluginResult));
          },

          didRangeBeaconsInRegion: function (pluginResult) {
              logToDom('[DOM] didRangeBeaconsInRegion: ' + JSON.stringify(pluginResult));
          }

      });

      var uuid = 'DA5336AE-2042-453A-A57F-F80DD34DFCD9';
      var identifier = 'beaconOnTheMacBooksShelf';
      var minor = 1000;
      var major = 5;
      var beaconRegion = new cordova.plugins.locationManager.BeaconRegion(identifier, uuid, major, minor);

      cordova.plugins.locationManager.setDelegate(delegate);

      // required in iOS 8+
      cordova.plugins.locationManager.requestWhenInUseAuthorization(); 
      // or cordova.plugins.locationManager.requestAlwaysAuthorization()

      cordova.plugins.locationManager.startMonitoringForRegion(beaconRegion)
          .fail(console.error)
          .done();

    }
};

app.initialize();