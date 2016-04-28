'use strict';

/**
 * @ngdoc function
 * @name IDshare.controller:MainController
 * @description
 * # createIdController
 */
angular.module('IDshare')
  .controller('businessTemplateController', function ($scope, $rootScope, $localStorage, FirebaseRef ,$cordovaImagePicker) {

    $scope.idData= {};

    $scope.getImage = function () {
      $cordovaImagePicker.getPictures($rootScope.options).then(function (result) {
        var ImageURI = result[0];
        var ImageBase64 = null;
        window.plugins.Base64.encodeFile(ImageURI, function (base64) {
          ImageBase64 = base64;
          $scope.idData.img = ImageBase64;
          $scope.$apply();
        });
      }, function (error) {
        alert('Error: ' + JSON.stringify(error));
      });
    }

  });
