//'use strict';
//
//angular.module('IDshare')
//
//  .factory('getImage', function($rootScope,$cordovaImagePicker) {
//    $cordovaImagePicker.getPictures($rootScope.options).then(function (result) {
//      var ImageURI = result[0];
//      window.plugins.Base64.encodeFile(ImageURI, function (base64) {
//        return  base64;
//      });
//    }, function (error) {
//      alert('Error: ' + JSON.stringify(error));
//    });
//  });
