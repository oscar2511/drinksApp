angular.module('starter')
  .controller('pedidoPendienteCtrl', function($scope,
                                       $stateParams,
                                       $rootScope,
                                       PedidoService,
                                       $ionicPopup,
                                       $http,
                                       $timeout,
                                       $state,
                                       $ionicLoading,
                                       PedidoService,
                                       NotificacionService
  )
  {

    $scope.pedidoService = PedidoService;

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

          var timer = $timeout(
            function() {
              $ionicLoading.hide();
              $state.go('app.error');
            },
            20000
          );

          $scope.pedidoService.cambiarEstado($rootScope.idUltPedido, estado)
            .then(function(){
              var mensaje = {
                'titulo':     '!Pedido '+cambio,
                'contenido':  'El pedido nro: '+$rootScope.idUltPedido+' fué marcado como '+cambio
              };
              NotificacionService.pushAdministrador( mensaje);

              $timeout.cancel(timer);
              $ionicLoading.hide();
              $scope.pedido.limpiarTodo();
              $state.go('app.categorias');
            })
            .catch(function(){
              $timeout.cancel(timer);
              $ionicLoading.hide();
              $state.go('app.error');
            });
        }
      });

    };

    $scope.pedido = PedidoService;

  });
