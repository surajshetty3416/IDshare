'use strict';

angular.module('IDshare')
  .controller('giveIdController', function($scope,FirebaseRef,uid) {
    $scope.show = false;
    FirebaseRef.child("key").once("value",function(snapshot){
      $scope.data = "IDshare"+JSON.stringify(snapshot.val());
      $scope.show=!$scope.show;
      console.log($scope.data);
      $scope.$apply();
      $scope.id = uid;
      console.log(uid);
    });


  });
