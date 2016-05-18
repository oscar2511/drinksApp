
angular.module('starter')
  .controller('pedidoCtrl', function($scope, PedidoFactory) {

    $scope.pedido = PedidoFactory;

    $scope.pedidoActual = $scope.pedido.getPedido();

    console.log($scope.pedidoActual);

  });
