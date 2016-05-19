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
      // Si no hay un pedido en curso se agrega el numero (eleatorio) y la fecha
      if($scope.pedido.numero)
        console.log('Existe un pedido en curso');
      else{
        $scope.pedido.numero = (Math.ceil(Math.random() * 999999999));
        $scope.pedido.fecha = new Date();
        console.log('nuevo pedido');
      }

      var productoPedido = {
        producto  : producto,
        cantidad  : cantidad
      };

      /**
       * Agregar producto a pedido
       */
      $scope.pedido.addProducto(productoPedido);
      console.log(PedidoFactory);
    };


    $scope.producto = producto;

  });
