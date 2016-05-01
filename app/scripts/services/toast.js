'use strict';

angular.module('IDshare')

  .factory('toast', function($cordovaToast) {
    return {
      show: function (msg) {
          if(window.cordova){
          $cordovaToast.showShortBottom(msg).then(function (success) {
           console.log(success);
          }, function (error) {
            console.log(error);
          });
        }
        else{
            alert(msg);
          }
      }
    };
  });
