
angular.module('starter')
  .controller('pedidoCtrl', function($scope, PedidoFactory) {

    $scope.pedido = PedidoFactory;

    console.log($scope.pedido.producto);

  });
