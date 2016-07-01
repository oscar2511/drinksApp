angular.module('starter')
  .controller('pedidoPendienteCtrl', function($scope,
                                       $stateParams,
                                       $rootScope,
                                       PedidoService,
                                       $ionicPopup,
                                       $http)
  {

    $scope.cancelarPedido = function(){
      alert($rootScope.idUltPedido);
      var urlCambiarEstado = 'http://23.94.249.163/appDrinks/pedidos/cambiar_estado_pedido.php';
      $http.post(urlCambiarEstado, {idPedido: $rootScope.idUltPedido, estado:4}, {headers: { 'Content-Type': 'application/json'}})
        .then(function (data){
          console.log(data);
        });
    };



    $scope.pedido = PedidoService;

    console.log($scope.pedido.dispositivo.uuid);

  });
