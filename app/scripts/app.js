'use strict';

/**
 * @ngdoc overview
 * @name IDshare
 */


angular.module('IDshare', ['ionic', 'ngCordova', 'ngResource'])

  .run(function($ionicPlatform) {

    $ionicPlatform.ready(function() {
      // save to use plugins here
    });

    // add possible global event handlers here

  })

  .config(function($httpProvider, $stateProvider, $urlRouterProvider) {
    // register $http interceptors, if any. e.g.
    // $httpProvider.interceptors.push('interceptor-name');

    // Application routing
    $stateProvider
      .state('app', {
        url: '/app',
        templateUrl: 'templates/mainOption.html',
        controller: 'MainOptionController'
      })
      .state('createId', {
        url: '/createId',
        templateUrl: 'templates/createId.html',
        controller: 'createIdController'
      });


    // redirects to default route for undefined routes
    $urlRouterProvider.otherwise('/app');
  });


