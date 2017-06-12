
angular.module('starter')
  .controller('admProductCtrl', function($scope, $http, $q, ProductService) {

    $scope.product = {};

    $scope.uploadFile = function(file) {
      $scope.file = file[0];
    }

    $scope.save = function(product) {
      ProductService.Upload($scope.file)
        .then(function(response) {
          alert('carga exitosa');
        });
    }



});
