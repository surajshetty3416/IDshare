'use strict';

angular.module('IDshare')
  .controller('createIdController', function ($scope, $localStorage) {
    $scope.status = {};
    if ($localStorage.createdIds) {
      if ($localStorage.createdIds != {}) {
        Object.keys($localStorage.createdIds).forEach(function (key) {
          if ($localStorage.createdIds[key].type == 'fr') {
            $scope.status.fr = true
          }
          if ($localStorage.createdIds[key].type == 'social') {
            $scope.status.social = true
          }
          if ($localStorage.createdIds[key].type == 'business') {
            $scope.status.business = true
          }
          if ($localStorage.createdIds[key].type == 'custom') {
            $scope.status.custom = true
          }
        });
      }
    }
  });
