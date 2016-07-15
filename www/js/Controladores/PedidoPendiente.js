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

    /**
     * Cancelar un pedido que esta como pendiente
     */
    $scope.cancelarPedido = function(){
      var confirmPopup = $ionicPopup.confirm({
        title:      'Confirmar acción',
        template:   'Realmente quieres cancelar tu pedido ?',
        cancelText: 'Cancelar',
        okText:     'Confirmar'
      });

      confirmPopup.then(function(res) {
        if(res) {
          var urlCambiarEstado = 'http://23.94.249.163/appDrinks/pedidos/cambiar_estado_pedido.php';
          $http.post(urlCambiarEstado, {idPedido: $rootScope.idUltPedido, estado:4}, {headers: { 'Content-Type': 'application/json'}})
            .then(function (data){
              console.log(data);
              $scope.pedido.limpiarTodo();
              var alertPopup = $ionicPopup.alert({
                title:   'Tu pedido fué cancelado',
                buttons: [{
                  text: 'Aceptar',
                  type: 'button button-outline button-positive'
                }]
              });

              alertPopup.then(function(res) {
                $state.go('app.categorias');
              });
            });
        }
      });
    };

    /**
     * Marcar como recibido un pedido
     */
    $scope.pedidoRecibido = function(){
      var confirmPopup = $ionicPopup.confirm({
        title:      'Confirmar acción',
        template:   'Realmente quieres marcar tu pedido como "Recibido" ?',
        cancelText: 'Cancelar',
        okText:     'Confirmar'
      });

      confirmPopup.then(function(res) {
        if(res) {
          var urlCambiarEstado = 'http://23.94.249.163/appDrinks/pedidos/cambiar_estado_pedido.php';
          $http.post(urlCambiarEstado, {idPedido: $rootScope.idUltPedido, estado:3}, {headers: { 'Content-Type': 'application/json'}})
            .then(function (data){
              $scope.pedido.limpiarTodo();
              $state.go('app.categorias');
            });
        }
      });

    };

    $scope.pedido = PedidoService;


  });
