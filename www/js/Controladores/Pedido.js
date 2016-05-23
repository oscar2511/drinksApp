
angular.module('starter')
  .controller('pedidoCtrl', function($scope, PedidoFactory, $ionicPopup, $timeout) {

    $scope.pedido = PedidoFactory;

    $scope.pedidoActual = $scope.pedido.getPedido();

    console.log($scope.pedidoActual);

    /**
     *  Elimina todos los productos del pedido
     */
    $scope.limpiarCarro = function(){

        var confirmPopup = $ionicPopup.confirm({
          title: 'Confirmar acción',
          template: 'Realmente quieres limpiar tu pedido?',
          cancelText: 'Cancelar',
          okText: 'Confirmar'
        });

        confirmPopup.then(function(res) {
          if(res) {
            $scope.pedido.limpiarPedido();
          } else {
            console.log('You are not sure');
          }
        });


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
      var alertPopup = $ionicPopup.alert({
        title: 'Sumaste 1 unidad mas al producto',
        buttons: null
      });

       $timeout(function() {
        alertPopup.close(); //close the popup after 3 seconds for some reason
       }, 1000);

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
      var alertPopup = $ionicPopup.alert({
        title: 'Quitaste 1 unidad al producto',
        buttons: null
      });

      $timeout(function() {
        alertPopup.close(); //close the popup after 3 seconds for some reason
      }, 1000);

   };

    /**
     * Elimina un producto de un pedido
     *
     * @param productoPedido
     */
    $scope.eliminarProducto = function(productoPedido){
      var confirmPopup = $ionicPopup.confirm({
        title: 'Confirmar acción',
        template: 'Realmente quieres quitar el producto de tu pedido?',
        cancelText: 'Cancelar',
        okText: 'Confirmar'
      });

      confirmPopup.then(function(res) {
        if(res) {
          var producto = productoPedido.producto;
          $scope.pedido.eliminarProductoPedido(producto);
        }
      });

    };

  });
















