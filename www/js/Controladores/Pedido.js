
angular.module('starter')
  .controller('pedidoCtrl', function($scope, PedidoFactory) {

    $scope.pedido = PedidoFactory;

    $scope.pedidoActual = $scope.pedido.getPedido();

    console.log($scope.pedidoActual);

    /**
     *  Elimina todos los productos del pedido
     */
    $scope.limpiarCarro = function(){
      $scope.pedido.limpiarPedido();
    };

    /**
     * Agrega en 1 la cantidad de un producto de un pedido
     *
     * @param productoPedido
     */
    $scope.addCantidad =  function(productoPedido){
      var producto = productoPedido.producto;
      var cantidad = 1;
      $scope.pedido.addProductoCantidad(producto, cantidad);
    };

    /**
     * Decrementa en 1 la cantidad de un producto de un pedido
     * @param productoPedido
     */
    $scope.restarCantidad = function(productoPedido){
      console.log(productoPedido);
     var producto = productoPedido.producto;
     var cantidad = -1;
     $scope.pedido.decrementarProductoCantidad(producto, cantidad);
   };

    /**
     * Elimina un producto de un pedido
     *
     * @param productoPedido
     */
    $scope.eliminarProducto = function(productoPedido){
      var producto = productoPedido.producto;
      $scope.pedido.eliminarProductoPedido(producto);
    };

  });
















