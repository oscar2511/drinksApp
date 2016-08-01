angular.module('starter')
  .controller('pedidoPendienteCtrl', function($scope,
                                       $stateParams,
                                       $rootScope,
                                       PedidoService,
                                       $ionicPopup,
                                       $http,
                                       $state,
                                       $ionicLoading,
                                       PedidoService
  )
  {

    $scope.pedidoService = PedidoService;

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
          $ionicLoading.show({
            template: 'Cancelando pedido<br><ion-spinner icon="lines" class="spinner-calm"></ion-spinner>'
          });

          var urlCambiarEstado = 'http://23.94.249.163/appDrinks/pedidos/cambiar_estado_pedido.php';
          $http.post(urlCambiarEstado, {idPedido: $rootScope.idUltPedido, estado:4}, {headers: { 'Content-Type': 'application/json'}})
            .then(function (data){
              console.log(data);
              $scope.pedido.limpiarTodo();
              $state.go('app.categorias');
              $ionicLoading.hide();
            });
        }
      });
    };

    /**
     * Marcar como recibido un pedido
     */
    $scope.cambiarEstado = function(estado){
      if(estado == 1) var cambio = 'recibido';
      else cambio = 'cancelado';
      var confirmPopup = $ionicPopup.confirm({
        title:      'Confirmar acción',
        template:   'Realmente quieres marcar tu pedido como '+cambio+' ?',
        cancelText: 'Cancelar',
        okText:     'Confirmar'
      });

      confirmPopup.then(function(res) {
        if(res) {
          $ionicLoading.show({
            template: 'Cargando<br><ion-spinner icon="lines" class="spinner-calm"></ion-spinner>'
          });

          $scope.pedidoService.cambiarEstado($rootScope.idUltPedido, estado)
            .then(function(){
              $ionicLoading.hide();
              $scope.pedido.limpiarTodo();
              $state.go('app.categorias');
            });
         /* var urlCambiarEstado = 'http://23.94.249.163/appDrinks/pedidos/cambiar_estado_pedido.php';
          $http.post(urlCambiarEstado, {idPedido: $rootScope.idUltPedido, estado:3}, {headers: { 'Content-Type': 'application/json'}})
            .then(function (data){
              $scope.pedido.limpiarTodo();
              $state.go('app.categorias');
              $ionicLoading.hide();
            });*/
        }
      });

    };

    $scope.pedido = PedidoService;

  });
