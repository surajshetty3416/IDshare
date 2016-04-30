'use strict';

/**
 * @ngdoc overview
 * @name IDshare
 */


angular.module('IDshare', ['ionic', 'ngCordova', 'ngResource', 'ngStorage', 'firebase', 'ja.qr'])

  .run(function ($ionicPlatform, $rootScope ,$localStorage) {

    $ionicPlatform.ready(function () {

       $rootScope.options = {
          maximumImagesCount: 1,
          width: 300,
          height: 300,
          quality: 70
        };
      $localStorage.$default({
        scannedIds:{},
        createdIds:{}
      })
    });


  })

  .config(function ($httpProvider, $stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('mainOption', {
        url: '/mainOption',
        templateUrl: 'templates/mainOption.html',
        controller: 'MainOptionController'
      })
      .state('giveId', {
        url: '/giveId',
        templateUrl: 'templates/giveId.html',
        controller: 'giveIdController',
        cache:false
      })
      .state('createId', {
        url: '/createId',
        templateUrl: 'templates/createId.html',
        controller: 'createIdController',
        cache:false
      })
      .state('viewId', {
        url: '/viewId',
        templateUrl: 'templates/viewId.html',
        controller: 'viewIdController',
        cache:false
      })
      .state('friendsRelatives', {
        url: '/friendsRelatives',
        templateUrl: 'templates/friendsRelativesTemplate.html',
        controller: 'friendsRelativesTemplateController'
      })
      .state('social', {
        url: '/social',
        templateUrl: 'templates/socialTemplate.html',
        controller: 'socialTemplateController'
      })
      .state('business', {
        url: '/business',
        templateUrl: 'templates/businessTemplate.html',
        controller: 'businessTemplateController'
      })
      .state('custom', {
        url: '/custom',
        templateUrl: 'templates/customTemplate.html',
        controller: 'customTemplateController'
      });

    $urlRouterProvider.otherwise('/mainOption');
  });


