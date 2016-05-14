angular.module('starter')
  .controller('productoCtrl', function($scope, $stateParams){
    var producto = angular.fromJson($stateParams.producto);
    console.log(producto.nombre);

    $scope.producto = producto;

  });
