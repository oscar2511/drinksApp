angular.module('starter')
  .controller('pedidoPendienteCtrl', function($scope,
                                       $stateParams,
                                       $rootScope,
                                       PedidoService,
                                       $ionicPopup,
                                       $http,
                                       $state,
                                       $ionicLoading,
                                       PedidoService,
                                       NotificacionService
  )
  {

    $scope.pedidoService = PedidoService;

    /**
     * Cancelar un pedido que esta como pendiente
     */
   /* $scope.cancelarPedido = function(){
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
    };*/

    /**
     * Cambiar estado de pedido
     * @param integer estado
     */
    $scope.cambiarEstado = function(estado){
      if(estado == 3) var cambio = 'recibido';
      else cambio = 'cancelado';
      var confirmPopup = $ionicPopup.confirm({
        title:      'Confirmar acción',
        template:   'Realmente quieres marcar tu pedido como '+cambio+'?',
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
              var mensaje = {
                'titulo':     '!Pedido '+cambio,
                'contenido':  'El pedido nro: '+$rootScope.idUltPedido+' fué marcado como '+cambio
              };
              NotificacionService.pushAdministrador( mensaje);

              $ionicLoading.hide();
              $scope.pedido.limpiarTodo();
              $state.go('app.categorias');
            })
            .catch(function(){
              $ionicLoading.hide();
              $state.go('app.error');
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
