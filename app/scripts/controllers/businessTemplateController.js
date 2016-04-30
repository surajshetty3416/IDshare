'use strict';

angular.module('IDshare')
  .controller('businessTemplateController', function ($scope, $cordovaImagePicker, $rootScope, FirebaseRef, professionList, $localStorage, uid, checkID, $state, toast) {

    $scope.getImage = function () {
      $cordovaImagePicker.getPictures($rootScope.options).then(function (result) {

        window.plugins.Base64.encodeFile(result[0], function (base64) {
          $scope.data.img = base64;
        });
      }, function (error) {
        alert('Error: ' + JSON.stringify(error));
      });
    };

    var checkData = checkID.isPresent("business");
    $scope.professions = professionList;
    if (checkData.status) {
      var data = $localStorage.createdIds[checkData.key];
      $scope.data = data;
    }
    else {
      $scope.data = {
        name: null,
        img: null,
        profession: null,
        email: null,
        officeAdd: null,
        mob: null,
        officeNo: null,
        linkedin: null,
        githubID: null,
        website: null
      };
    }

    $scope.save = function (upload) {
      if (!checkData.status) {
        var saveId = uid;
        console.log(saveId);
        var type = 'business';
        var data = {
          name: $scope.data.name,
          profession: $scope.data.profession,
          type: "business"
        };
        var qrdata = "IDshare" + saveId + JSON.stringify(data);
        $localStorage.createdIds[saveId] = $scope.data;
        $localStorage.createdIds[saveId].type = type;
        $localStorage.createdIds[saveId].qrdata = qrdata;
        if (upload)
          FirebaseRef.child(saveId).set($localStorage.createdIds[saveId]);
      }
      else {
        var type = 'business';
        var saveId = checkData.key;
        var data = {
          name: $scope.data.name,
          profession: $scope.data.profession,
          type: "business"
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
    }


  });
