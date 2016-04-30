'use strict';

angular.module('IDshare')
  .controller('giveIdController', function ($scope, $localStorage, checkID, $ionicModal) {
    $scope.show = false;
    $scope.fr = checkID.isPresent('fr');
    $scope.social = checkID.isPresent('social');
    $scope.business = checkID.isPresent('business');
    $scope.custom = checkID.isPresent('custom');


    $ionicModal.fromTemplateUrl('qrView.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.modal = modal;
      console.log($scope.modal)
    });
    $scope.openModal = function (key) {
      $scope.qrData = $localStorage.createdIds[key].qrdata;
      console.log($scope.qrData);
      $scope.show = true;
      $scope.modal.show();
    };
    $scope.closeModal = function () {
      $scope.modal.hide();
    };
    // Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function () {
      $scope.modal.remove();
    });

  });
