
angular.module('starter')
  .controller('pedidoCtrl', function($scope, pedidoDrinks) {

    console.log(pedidoDrinks.getPedido());

  });
