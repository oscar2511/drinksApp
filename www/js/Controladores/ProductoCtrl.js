angular.module('starter')
  .controller('productoCtrl', function($scope, $stateParams, $rootScope, PedidoFactory){
    var producto = angular.fromJson($stateParams.producto);
    console.log(producto.nombre);

    var ped = new PedidoFactory(1);

    ped.agregarProducto(producto);


    $scope.producto = producto;

  });
