'use strict';

angular.module('IDshare')
  .controller('socialTemplateController', function ($scope, FirebaseRef, $localStorage, uid, checkID, $state, toast, $cordovaImagePicker, $rootScope) {
    var checkData = checkID.isPresent("social");

    if (checkData.status) {
      var data = $localStorage.createdIds[checkData.key];
      $scope.data = data;
    }
    else {
      $scope.data = {
        name: null,
        status: null,
        img: null,
        mob: null,
        facebookID: null,
        twitterID: null,
        githubID: null,
        youtubeID: null,
        instagramID: null
      };
    }
    $scope.save = function (upload) {
      if (!checkData.status) {
        var saveId = uid.get();
        console.log(saveId);
        var type = 'social';
        var data = {
          name: $scope.data.name,
          facebookID: $scope.data.facebookID,
          type: "social"
        };
        var qrdata = "IDshare" + saveId + JSON.stringify(data);
        $localStorage.createdIds[saveId] = $scope.data;
        $localStorage.createdIds[saveId].type = type;
        $localStorage.createdIds[saveId].qrdata = qrdata;
        if (upload)
          FirebaseRef.child(saveId).set($localStorage.createdIds[saveId],$rootScope.onComplete);
      }
      else {
        var type = 'social';
        var saveId = checkData.key;
        var data = {
          name: $scope.data.name,
          facebookID: $scope.data.facebookID,
          type: "social"
        };
        delete data.qrdata;
        var qrdata = "IDshare" + saveId + JSON.stringify(data);
        $localStorage.createdIds[saveId] = $scope.data;
        $localStorage.createdIds[saveId].type = type;
        $localStorage.createdIds[saveId].qrdata = qrdata;
        if (upload)
          FirebaseRef.child(saveId).set($localStorage.createdIds[saveId],$rootScope.onComplete);
      }
      $state.go('mainOption');
      toast.show("Saved Successfully");
    };

    $scope.getImage = function () {
      $cordovaImagePicker.getPictures($rootScope.options).then(function (result) {

        window.plugins.Base64.encodeFile(result[0], function (base64) {
          $scope.data.img = base64;
          $scope.$apply();
        });
      }, function (error) {
        alert('Error: ' + JSON.stringify(error));
      });
    };

  });
