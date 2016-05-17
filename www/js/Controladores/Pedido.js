
angular.module('starter')
  .controller('pedidoCtrl', function($scope, PedidoFactory) {

$scope.test = PedidoFactory.getPedidos();
    console.log(PedidoFactory.getPedidos());

  });
