angular.module('starter')
  .controller('productoCtrl', function($scope,
                                       $stateParams,
                                       $rootScope,
                                       PedidoService,
                                       $ionicPopup)
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
        console.log('Thank you for not eating my delicious ice cream cone');
      });

    };

  });
