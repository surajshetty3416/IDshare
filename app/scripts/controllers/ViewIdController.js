'use strict';

angular.module('IDshare')
  .controller('viewIdController', function ($scope, $localStorage, $ionicModal, FirebaseRef, $ionicLoading, toast) {

    $scope.Ids = [
      {name: "Friends/Relatives IDs", items: []},
      {name: "Social IDs", items: []},
      {name: "Business IDs", items: []},
      {name: "Custom IDs", items: []}
    ];

    Object.keys($localStorage.scannedIds).forEach(function (key) {
      var data = $localStorage.scannedIds[key];
      data.key = key;
      if (data.type == "fr") {
        $scope.Ids[0].items.push(data)
      }
      if (data.type == "social") {
        $scope.Ids[1].items.push(data)
      }
      if (data.type == "business") {
        $scope.Ids[2].items.push(data)
      }
      if (data.type == "custom") {
        $scope.Ids[3].items.push(data)
      }
    });

    $scope.toggleId = function (Id) {
      if ($scope.isIdShown(Id)) {
        $scope.shownId = null;
      } else {
        $scope.shownId = Id;
      }
    };
    $scope.isIdShown = function (Id) {
      return $scope.shownId === Id;
    };

    $ionicModal.fromTemplateUrl('viewSavedId.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.modal = modal;
    });
    $scope.show = function (key) {
      $scope.data = $localStorage.scannedIds[key];
      $scope.modal.show();
    };
    $scope.closeModal = function () {
      $scope.modal.hide();
    };

    $scope.$on('$destroy', function () {
      $scope.modal.remove();
    });

    $scope.getData = function(){
      $ionicLoading.show();
      FirebaseRef.child($scope.data.key).once("value",function(snapshot){
        if(snapshot.exists()){
          $scope.data = snapshot.val();
          $scope.data.key = snapshot.key();
          $localStorage.scannedIds[$scope.data.key]= $scope.data;
          $ionicLoading.hide();
          $scope.$apply();
        }
        else{
          $ionicLoading.hide();
          toast.show("No Additional Data Found");
        }
      });
    };

    $scope.addContact = function(){
      function onSuccess(contact) {
        console.log(contact);
        toast.show("Contact Saved");
      };

      function onError(contactError) {
        toast.show("Error = " + contactError.code);
      };
      var newContact = navigator.contacts.create({"displayName": $scope.data.name});
      var phoneNumbers = [];

      phoneNumbers[0] = new ContactField('work', $scope.data.officeNo, false);
      phoneNumbers[1] = new ContactField('mobile', $scope.data.mob, true);
      newContact.phoneNumbers = phoneNumbers;
      newContact.save(onSuccess,onError);
    }

  });
