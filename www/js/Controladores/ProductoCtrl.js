angular.module('starter')
  .controller('productoCtrl', function($scope,
                                       $stateParams,
                                       $rootScope,
                                       PedidoService,
                                       $ionicPopup,
                                       $state
  )
  {
    $scope.producto = angular.fromJson($stateParams.producto);
    $scope.cantidad = 1;
    $scope.pedido   = PedidoService;
    /**
     *  Agregar producto al carro
     *
     * @param producto
     * @param cantidad
     */
    $scope.addAlCarro = function(producto, cantidad){
      console.log($rootScope.pedidoPendiente);
      if($rootScope.totalProductos == 'pendiente') {
        $scope.tienePedidoPendiente();
        return 0;
      }

      $scope.pedido.addProducto(producto, cantidad);

      /**
       * Mostrar pupop cuando se agrega un producto al pedido
       * @type {Object|*}
       */
      var alertPopup = $ionicPopup.alert({
        title:   'Producto añadido correctamente',
        buttons: [{
          text: 'Seguir comprando',
          type: 'button button-positive'
        }]
      });

      alertPopup.then(function(res) {
      });


      /**
       * Redirige a pedido si intenta agregar producto y tiene uno pendiente
       */
      $scope.tienePedidoPendiente = function(){
        var alertPopup = $ionicPopup.alert({
          title:   'Tienes un pedido pendiente',
          buttons: [{
            text: 'Aceptar',
            type: 'button button-positive'
          }]
        });

        alertPopup.then(function(res) {
          $scope.pedido.limpiarPedido();
          $rootScope.totalProductos = 'pendiente';
          $rootScope.tieneProductos = 0;
          $state.go('app.pedido-pendiente');
        });
      }
    };

  });
