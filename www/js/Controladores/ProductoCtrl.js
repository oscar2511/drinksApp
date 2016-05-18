angular.module('starter')
  .controller('productoCtrl', function($scope, $stateParams, $rootScope, PedidoFactory){
    var producto = angular.fromJson($stateParams.producto);

    $scope.cantidad = 0;

   $scope.pedido = PedidoFactory;

    $scope.addAlCarro = function(producto, cantidad){
      //todo armar el json del pedido (meter la cantidad dentro del objeto producto)
      console.log(cantidad);


      $scope.pedido.addProducto(producto, cantidad);
      console.log(PedidoFactory);
    };




    $scope.producto = producto;

  });
