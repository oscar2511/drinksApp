angular.module('starter')
  .controller('productoCtrl', function($scope, $stateParams, $rootScope, PedidoFactory, $ionicPopup, $timeout){
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

      var alertPopup = $ionicPopup.alert({
        title: 'Producto añadido correctamente',
        buttons: [{
          text: 'Seguir comprando',
          type: 'button button-dark'
        }]

        //template: 'Producto añadido correctamente'
      });

     /* $timeout(function() {
        alertPopup.close(); //close the popup after 3 seconds for some reason
      }, 2000);
          */

      alertPopup.then(function(res) {
        console.log('Thank you for not eating my delicious ice cream cone');
      });

    };

  });
