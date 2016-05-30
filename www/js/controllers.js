angular.module('starter.controllers', [])

.controller('AppCtrl',
  function($scope,
           $ionicModal,
           $timeout,
           PedidoService)
  {

  $scope.pedido = PedidoService;

});

