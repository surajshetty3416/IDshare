'use strict';

angular.module('IDshare')
  .controller('globalSearchController', function ($scope, FirebaseRef, $ionicModal,$ionicLoading) {
    //console.log("in");
    //function search(index, type, searchTerm, callback) {
    //  var reqRef = new Firebase("https://idshare1.firebaseio.com/").child('search/request').push({ index: index, type: type, query: searchTerm });
    //
    //  FirebaseRef.child('search/response/'+reqRef.key()).on('value', function fn(snap) {
    //    if( snap.val() !== null ) {     // wait for data
    //      snap.ref().off('value', fn); // stop listening
    //      snap.ref().remove();         // clear the queue
    //      callback(snap.val());
    //    }
    //  });
    //}
    //// invoke a search for *foo*
    //search('firebase', 'name', 'Suraj Shetty', function(data) {
    //  console.log('got back '+data.total+' hits');
    //  if( data.hits ) {
    //    data.hits.forEach(function(hit) {
    //      console.log(hit);
    //    });
    //  }
    //});
    $ionicLoading.show();
    FirebaseRef.orderByChild("global").equalTo(true).once("value", function (snapshot) {
     $scope.allData={};
      $scope.list = [];
        if(snapshot.exists()){
          //console.log(snapshot.val());
          snapshot.forEach(function(child){
            $scope.allData[child.key()]=child.val();
            $scope.allData[child.key()].key=child.key();
            $scope.list.push($scope.allData[child.key()]);
            // console.log($scope.list);
          });
          $scope.$apply();
          $ionicLoading.hide();
        }
    } );


    $ionicModal.fromTemplateUrl('viewSavedId.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.modal = modal;
    });
    $scope.show = function (key) {
      $scope.data = $scope.allData[key];
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

    $scope.addContact = function() {
      findContacts();

      function onSuccess(contact) {
        console.log(contact);
        toast.show("Contact Saved");
      }
      function onError(contactError) {
        toast.show("Error = " + contactError.code);
      }
      function createContact() {
        var newContact = navigator.contacts.create({"displayName": $scope.data.name});
        var phoneNumbers = [];

        phoneNumbers[0] = new ContactField('work', $scope.data.officeNo, false);
        phoneNumbers[1] = new ContactField('mobile', $scope.data.mob, true);
        newContact.phoneNumbers = phoneNumbers;
        newContact.save(onSuccess, onError);
      }

      function contactfindSuccess(contacts) {
        $ionicPopup.alert({
          template: 'Contact Already Exists !' + contacts
        });
      }

      function contactfindError(message) {
        alert('Failed because: ' + message);
        createContact();
      }

      function findContacts() {
        var options = new ContactFindOptions();
        options.filter = $scope.data.mob || $scope.data.officeNo;
        options.multiple = false;

        var fields = ["phoneNumbers"];
        navigator.contacts.find(fields, contactfindSuccess, contactfindError, options);
      }


    };

    $scope.callNumber = function(number){
      function onSuccess(result){
        console.log("Success:"+result);
      }

      function onError(result) {
        console.log("Error:"+result);
      }
      window.plugins.CallNumber.callNumber(onSuccess, onError, number, true);
    }



  });
