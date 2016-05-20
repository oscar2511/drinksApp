
angular.module('starter')
  .controller('pedidoCtrl', function($scope, PedidoFactory) {

    $scope.pedido = PedidoFactory;

    $scope.pedidoActual = $scope.pedido.getPedido();

    $scope.limpiarCarro = function(){
      $scope.pedido.limpiarPedido();
    };

    console.log($scope.pedidoActual);

  });
