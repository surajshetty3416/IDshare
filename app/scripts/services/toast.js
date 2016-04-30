'use strict';

angular.module('IDshare')

  .factory('toast', function($cordovaToast) {
    return {
      show: function (msg) {
        $cordovaToast.showShortBottom(msg).then(function (success) {
         console.log(success);
        }, function (error) {
          console.log(error);
        });
      }
    };
  });
