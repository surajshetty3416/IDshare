'use strict';

angular.module('IDshare')

  .factory('checkID', function($localStorage) {
    return {
      isPresent: function (type) {
        var result ={
          status: false,
          key:null
        };
        if($localStorage.createdIds == {})
        {
          return result;
        }
        else{
          Object.keys($localStorage.createdIds).forEach(function(key){
            if($localStorage.createdIds[key].type == type){
              result.status = true;
              result.key = key;
            }
          });
          return result;
        }

      }
    };
  });
