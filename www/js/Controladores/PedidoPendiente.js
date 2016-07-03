angular.module('starter')
  .controller('pedidoPendienteCtrl', function($scope,
                                       $stateParams,
                                       $rootScope,
                                       PedidoService,
                                       $ionicPopup,
                                       $http,
                                       $state
  )
  {

    $scope.cancelarPedido = function(){
      var urlCambiarEstado = 'http://23.94.249.163/appDrinks/pedidos/cambiar_estado_pedido.php';
      $http.post(urlCambiarEstado, {idPedido: $rootScope.idUltPedido, estado:4}, {headers: { 'Content-Type': 'application/json'}})
        .then(function (data){
          console.log(data);
          $scope.pedido.limpiarTodo();
          var alertPopup = $ionicPopup.alert({
            title:   'Tu pedido fué cancelado',
            buttons: [{
              text: 'Aceptar',
              type: 'button button-positive'
            }]
          });


          alertPopup.then(function(res) {
            $state.go('app.categorias');
          });

        });
    };



    $scope.pedido = PedidoService;

    console.log($scope.pedido.dispositivo.uuid);

  });
