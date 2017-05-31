angular.module('starter')
  .controller('productoCtrl', function($scope,
                                       $stateParams,
                                       $rootScope,
                                       PedidoService,
                                       $ionicPopup,
                                       $state,
                                       $timeout,
                                       $base64
  )
  {
    $scope.producto = angular.fromJson($stateParams.producto);
    $scope.cantidad = 1;

    $scope.pedido   = PedidoService;

    $scope.producto.urlImg = $base64.decode($scope.producto.urlImg);

    /**
     *  Agregar producto al carro
     *
     * @param producto
     * @param cantidad
     */
    $scope.addAlCarro = function(producto, cantidad){
     /* if($rootScope.totalProductos == 'pendiente') {
        $scope.tienePedidoPendiente();
        return 0;
      }
      */

      PedidoService.addProducto(producto, cantidad);

      /**
       * Mostrar popup cuando se agrega un producto al pedido
       * @type {Object|*}
       */
      var alertPopup = $ionicPopup.alert({
        title: 'Producto agregado!',
        buttons: null
      });

      $timeout(function() {
        $scope.cantidad = 1;
        alertPopup.close();
      }, 1500);


      /**
       * Redirige a pedido si intenta agregar producto y tiene uno pendiente
       */
      $scope.tienePedidoPendiente = function(){
        var alertPopup = $ionicPopup.alert({
          title:   'Tienes un pedido pendiente',
          buttons: [{
            text: 'Aceptar',
            type: 'button button-outline button-positive'
          }]
        });

        alertPopup.then(function(res) {
          PedidoService.limpiarPedido();
          $rootScope.totalProductos = 'pendiente';
          $rootScope.tieneProductos = 0;
          $state.go('app.pedido-pendiente');
        });
      }
    };

    /**
     *
     */
    $scope.sumarCantidad = function(){
      $scope.cantidad = $scope.cantidad + 1;
    };

    /**
     *
     */
    $scope.restarCantidad = function(){
      $scope.cantidad = $scope.cantidad - 1;
    };


  });
