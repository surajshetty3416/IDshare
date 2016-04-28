angular.module('IDshare')

  .factory('toast', function($cordovaToast) {
    return {
      show: function (msg) {
        $cordovaToast.showShortBottom(msg).then(function (success) {
          // success
        }, function (error) {
          // error
        });
      }
    };
  });
