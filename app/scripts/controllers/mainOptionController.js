'use strict';

angular.module('IDshare')
  .controller('MainOptionController', function ($scope, $localStorage, toast, $state) {
    $scope.scanQR = function () {
      cordova.plugins.barcodeScanner.scan(
        function (result) {
          var data = result.text;
          if (result.format != "QR_CODE" || data.substring(0, 7) != "IDshare")
            alert("Invalid Code." + " \n Scan QR Code on IDshare \n Code Output:" + result.text);
          else {
            $localStorage.scannedIds[data.slice(7, 17)] = JSON.parse(data.slice(17, data.length));
            $localStorage.scannedIds[data.slice(7, 17)].key = data.slice(7, 17);
            toast.show("Got ID !");
            $state.go('viewId');
          }
        },
        function (error) {
          alert(error);
        }
      );
    };


  });
