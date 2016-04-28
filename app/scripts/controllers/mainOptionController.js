'use strict';

/**
 * @ngdoc function
 * @name IDshare.controller:MainController
 * @description
 * # MainController
 */
angular.module('IDshare')
  .controller('MainOptionController', function($scope,$localStorage) {
    $scope.scanQR = function () {
      cordova.plugins.barcodeScanner.scan(
        function (result) {
          var data = result.text;
          if(result.format != "QR_CODE" || data.substring(0,7)!= "IDshare" )
          alert("Invalid Code."+result.text.substring(0,6)+" \n Please Scan QR Code on IDshare App\n Code Output:"+result.text );
          else{
            if(!$localStorage.scannedIds)
              $localStorage.scannedIds=[];
            $localStorage.scannedIds.push(JSON.parse(data.slice(7,data.length)));
            toast.show("Got ID !!!");
          }
        },
        function (error) {
          alert(error);
        }
      );
    };


  });
