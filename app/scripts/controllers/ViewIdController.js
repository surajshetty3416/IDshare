'use strict';

angular.module('IDshare')
  .controller('viewIdController', function ($scope, $localStorage, $ionicModal) {

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
      console.log($scope.modal)
    });
    $scope.show = function (key) {
      $scope.data = $localStorage.scannedIds[key];
      console.log($scope.data);
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
