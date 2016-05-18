angular.module('starter')
  .controller('productoCtrl', function($scope, $stateParams, $rootScope, PedidoFactory){
    var producto = angular.fromJson($stateParams.producto);

    $scope.cantidad = 0;
    $scope.pedido   = PedidoFactory;

    if($scope.cantidad <= 0)
      $scope.disable = 'disable';



    $scope.addAlCarro = function(producto, cantidad){
      if(cantidad <= 0)
        alert('la cantidad debe ser 1 o +');

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
