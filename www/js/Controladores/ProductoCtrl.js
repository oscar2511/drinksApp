angular.module('starter')
  .controller('productoCtrl', function($scope, $stateParams, $rootScope, PedidoFactory){
    var producto = angular.fromJson($stateParams.producto);

    $scope.cantidad = 1;
    $scope.pedido   = PedidoFactory;

    /**
     *  Agregar producto al carro
     *
     * @param producto
     * @param cantidad
     */
    $scope.addAlCarro = function(producto, cantidad){

      /**
       * Agregar producto a pedido
       */
      $scope.pedido.addProducto(producto, cantidad);

    };


    $scope.producto = producto;

  });
