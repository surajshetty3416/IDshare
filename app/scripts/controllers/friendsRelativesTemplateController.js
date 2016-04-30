'use strict';

angular.module('IDshare')
  .controller('friendsRelativesTemplateController', function ($scope, $cordovaImagePicker, $rootScope, FirebaseRef, $localStorage, uid, checkID, $state, toast) {
    var checkData = checkID.isPresent("fr");

    if (checkData.status) {
      var data = $localStorage.createdIds[checkData.key];
      $scope.data = data;
      $scope.data.dob = new Date($scope.data.dob);
    }
    else {
      $scope.data = {
        name: null,
        img: null,
        add: null,
        mob: null,
        dob: null,
        bloodGroup: null
      };
    }
    $scope.save = function (upload) {
      if (!checkData.status) {
        var saveId = uid;
        console.log(saveId);
        var type = 'fr';
        var data = {
          name: $scope.data.name,
          add: $scope.data.add,
          mob: $scope.data.mob,
          type: "fr"
        };
        var qrdata = "IDshare" + saveId + JSON.stringify(data);
        $localStorage.createdIds[saveId] = $scope.data;
        $localStorage.createdIds[saveId].type = type;
        $localStorage.createdIds[saveId].qrdata = qrdata;
        $localStorage.createdIds[saveId].dob = $localStorage.createdIds[saveId].dob.toISOString();
        if (upload)
          FirebaseRef.child(saveId).set($localStorage.createdIds[saveId]);
      }
      else {
        var type = 'fr';
        var saveId = checkData.key;
        var data = {
          name: $scope.data.name,
          add: $scope.data.add,
          mob: $scope.data.mob,
          type: "fr"
        };
        delete data.qrdata;
        var qrdata = "IDshare" + saveId + JSON.stringify(data);
        $localStorage.createdIds[saveId] = $scope.data;
        $localStorage.createdIds[saveId].type = type;
        $localStorage.createdIds[saveId].qrdata = qrdata;
        $localStorage.createdIds[saveId].dob = $localStorage.createdIds[saveId].dob.toISOString();
        if (upload) {
          FirebaseRef.child(saveId).set($localStorage.createdIds[saveId]);
        }
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
