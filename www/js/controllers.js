angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, PedidoFactory) {

  // Form data for the login modal
  $scope.loginData = {};

  $scope.pedido = PedidoFactory;


  // Create the login modal that we will use later


});

