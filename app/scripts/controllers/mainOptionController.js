'use strict';

/**
 * @ngdoc function
 * @name IDshare.controller:MainController
 * @description
 * # MainController
 */
angular.module('IDshare')
  .controller('MainOptionController', function ($scope, $localStorage, toast, $state) {
    $scope.scanQR = function () {
      cordova.plugins.barcodeScanner.scan(
        function (result) {
          var data = result.text;
          if (result.format != "QR_CODE" || data.substring(0, 7) != "IDshare")
            alert("Invalid Code." + result.text.substring(0, 6) + " \n Please Scan QR Code on IDshare App\n Code Output:" + result.text);
          else {
            $localStorage.scannedIds[data.slice(7, 12)] = JSON.parse(data.slice(12, data.length));
            toast.show("Got ID !!!");
            $state.go('viewId');
          }
        },
        function (error) {
          alert(error);
        }
      );
    };


  });
