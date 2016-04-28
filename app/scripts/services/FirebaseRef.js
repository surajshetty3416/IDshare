'use strict';

angular.module('IDshare')
  .factory('FirebaseRef', function () {
    var ref = new Firebase("https://idshare.firebaseio.com/");
    return ref;
  })
