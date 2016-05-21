angular.module('starter')
  .controller('productoCtrl', function($scope, $stateParams, $rootScope, PedidoFactory){
    //var producto = angular.fromJson($stateParams.producto);


    $scope.producto = angular.fromJson($stateParams.producto);
    //console.log($scope.producto);
    $scope.cantidad = 1;
    $scope.pedido   = PedidoFactory;

    /**
     *  Agregar producto al carro
     *
     * @param producto
     * @param cantidad
     */
    $scope.addAlCarro = function(producto, cantidad){
      $scope.pedido.addProducto(producto, cantidad);
    };

  });
