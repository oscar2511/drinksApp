angular.module('starter.controllers', [])

.controller('AppCtrl',
  function($scope,
           $ionicModal,
           $timeout,
           PedidoService,
            $http)
  {

  $scope.pedido = PedidoService;



});

