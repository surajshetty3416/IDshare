'use strict';

angular.module('IDshare')
  .controller('customTemplateController', function ($scope, $cordovaImagePicker, $rootScope, FirebaseRef, $localStorage, uid, checkID, $state, toast) {
    var checkData = checkID.isPresent("custom");

    if (checkData.status) {
      var data = $localStorage.createdIds[checkData.key];
      $scope.data = data;
    }
    else {
      $scope.data = {
        name: null,
        img: null,
        email: null,
        add: null,
        mob: null,
        dob: null,
        facebookId: null,
        comments: null
      };
    }


    $scope.save = function (upload) {
      if (!checkData.status) {
        var saveId = uid;
        console.log(saveId);
        var type = 'custom';
        var data = {
          name: $scope.data.name,
          mob: $scope.data.mob,
          type: "custom"
        };
        var qrdata = "IDshare" + saveId + JSON.stringify(data);
        $localStorage.createdIds[saveId] = $scope.data;
        $localStorage.createdIds[saveId].type = type;
        $localStorage.createdIds[saveId].qrdata = qrdata;
        if (upload)
          FirebaseRef.child(saveId).set($localStorage.createdIds[saveId]);
      }
      else {
        var type = 'custom';
        var saveId = checkData.key;
        var data = {
          name: $scope.data.name,
          mob: $scope.data.mob,
          type: "custom"
        };
        delete data.qrdata;
        var qrdata = "IDshare" + saveId + JSON.stringify(data);
        $localStorage.createdIds[saveId] = $scope.data;
        $localStorage.createdIds[saveId].type = type;
        $localStorage.createdIds[saveId].qrdata = qrdata;
        if (upload)
          FirebaseRef.child(saveId).set($localStorage.createdIds[saveId]);
      }
      $state.go('mainOption');
      toast.show("Saved Successfully");
    };

    $scope.getImage = function () {
      $cordovaImagePicker.getPictures($rootScope.options).then(function (result) {

        window.plugins.Base64.encodeFile(result[0], function (base64) {
          $scope.data.img = base64;
        });
      }, function (error) {
        alert('Error: ' + JSON.stringify(error));
      });
    };

  });
