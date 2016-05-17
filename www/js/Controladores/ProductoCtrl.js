angular.module('starter')
  .controller('productoCtrl', function($scope, $stateParams, $rootScope, PedidoFactory){
    var producto = angular.fromJson($stateParams.producto);
    console.log(producto.nombre);

    var ped = new PedidoFactory.Pedido(1,'fecha');

    console.log(PedidoFactory.agregarProducto());


    $scope.producto = producto;

  });
