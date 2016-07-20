
angular.module('starter')
  .controller('salirCtrl', function($scope) {

    ionic.Platform.exitApp();
  });
