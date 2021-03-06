angular.module('starter')
  .controller('pedidoDetalleCtrl', function(
    $scope,
    $stateParams,
    $http,
    $ionicLoading,
    $ionicPopover,
    $state,
    $ionicModal,
    NotificacionService,
    $ionicPopup,
    $timeout,
    mapaService,
    PedidoService,
    $rootScope,
    ConstantsService
  ){

    $ionicLoading.show({
      template: 'Cargando<br><ion-spinner icon="lines" class="spinner-calm"></ion-spinner>'
    });

    $scope.pedido = angular.fromJson($stateParams.pedido);

    $scope.pedido.fecha = new Date($scope.pedido.fecha);
    var idPedido        = $scope.pedido.id;
    $scope.mostrarMapa = false;
    $scope.claseBtn    = 'button button-balanced button-outline iconleft ion-chevron-down';

    /**
     * Obtener el detalle de un pedido
     *
     */
    $scope.getDetallePedido = function(){
      var url = ConstantsService.ORDER_DETAIL + idPedido;
      $http.get(url)
        .then(function (data){
          $scope.pedidoDetalle = data.data.detail;
          $ionicLoading.hide();
        })
        .catch(function(){
          $ionicLoading.hide();
          $state.go(app.error)
        });
    };

    $scope.getDetallePedido();


//modal estado
    $scope.crearModal = function() {
      $ionicModal.fromTemplateUrl('modal-estado.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function (modal) {
        $scope.modal = modal;
      });
      $scope.openModal = function () {
        $scope.modal.show();
      };
      $scope.closeModal = function () {
        $scope.modal.hide();
      };
      // Cleanup the modal when we're done with it!
      $scope.$on('$destroy', function () {
        $scope.modal.remove();
      });
      // Execute action on hide modal
      $scope.$on('modal.hidden', function () {
        // Execute action
      });
      // Execute action on remove modal
      $scope.$on('modal.removed', function () {
        // Execute action
      });
    };

    $scope.crearModal();

    //notificacion
    $ionicModal.fromTemplateUrl('modal-notificacion.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modalNotif) {
      $scope.modalNotif = modalNotif;
    });
    $scope.openModalNotif = function() {
      $scope.modalNotif.show();
    };
    $scope.closeModalNotif = function() {
      $scope.modalNotif.hide();
    };


    /**
     * Mostrar mapa
     */
    $scope.verMapa = function(mostrarMapa){
      if(mostrarMapa) {
        $scope.mostrarMapa = false;
        $scope.claseBtn    = 'button button-balanced button-outline iconleft ion-chevron-down';
      }
      else {
        $scope.mostrarMapa = true;
        $scope.claseBtn    = 'button button-balanced button-outline iconleft ion-chevron-up';
      }
      mapaService.verMapa($scope.pedido.address.coordenadas.lat, $scope.pedido.address.coordenadas.long);
    };

    /**
     *
     */
    $scope.enviarPushUsuario = function(titulo, contenido){
      $ionicLoading.show({
        template: 'Enviando notificación<br><ion-spinner icon="lines" class="spinner-calm"></ion-spinner>'
      });

      var timer = $timeout(
        function() {
          $ionicLoading.hide();
          $state.go('app.error');
        },
        20000
      );

      var mensaje = {
        'titulo':    titulo,
        'contenido': contenido
      };

      NotificacionService.pushUsuario(mensaje, $scope.pedido.idDispositivo)
        .then(function(){
          $timeout.cancel(timer);
          $ionicLoading.hide();
          var alertPopup = $ionicPopup.alert({
            title: 'Notificación enviada',
            buttons: null
          });

          $timeout(function() {
            alertPopup.close();
            $scope.closeModalNotif();
          }, 2000);
        })
        .catch(function(){
          $timeout.cancel(timer);
          $ionicLoading.hide();
          alert('Error al enviar notificaion al usuario');
        });
    };


    /**
     *  Cambiar estado de un pedido
     * @param idPedido
     * @param estado
     */
    $scope.cambiarEstado = function(idPedido, estado) {
      var msj = '';
      var msjPush = '';
      if(estado == 2) {
        msj     =  '(se enviará notificación al usuario)';
        msjPush = 'Pedido procesado!';
      }
      /*else if (estado == 4)
        msjPush = 'Pedido cancelado';
      else
        msjPush = 'Pedido cerrado';
*/
      var confirmPopup = $ionicPopup.confirm({
        title:      'Confirmar acción',
        template:   'Realmente quieres cambiar el estado del pedido? '+ msj,
        cancelText: 'Cancelar',
        okText:     'Confirmar'
      });

      confirmPopup.then(function(res) {
        if(res) {
          $ionicLoading.show({
            template: 'Cambiando estado<br><ion-spinner icon="lines" class="spinner-calm"></ion-spinner>'
          });
          PedidoService.cambiarEstado(idPedido, estado)
            .then(function(data) {

                $scope.pedido.state = estado;
                $ionicLoading.hide();
                var alertPopup = $ionicPopup.alert({
                  title: 'Cambio de estado exitoso',
                  buttons: null
                });
                $timeout(function () {
                  alertPopup.close();
                  $scope.closeModal();
                }, 2000);

              /*
              if(estado == 2) {
                var mensaje = {
                  'titulo': msjPush,
                  'contenido': 'Recibimos tu pedido, pronto será entregado'
                };
                NotificacionService.pushUsuario(mensaje, $scope.pedido.idDispositivo);
              }

              if(estado == 3) {
                var mensajeSilencioso1 = {
                  'titulo': 'Pedido cerrado!',
                  'contenido': 'Tu pedido fué marcado como cerrado.'
                };
                NotificacionService.pushSilencioso(mensajeSilencioso1, $scope.pedido.idDispositivo, estado);
              }

              if(estado == 4) {
                var mensajeSilencioso2 = {
                  'titulo': 'Pedido cancelado!',
                  'contenido': 'Tu pedido fué cancelado.'
                };
                NotificacionService.pushSilencioso(mensajeSilencioso2, $scope.pedido.idDispositivo, estado);
              }
                */
            })
            .catch(function(err) {
              var alertPopupError = $ionicPopup.alert({
                title: 'Error cambiando estado de pedido',
                buttons: null
              });
              $timeout(function () {
                alertPopupError.close();
                $scope.closeModal();
              }, 2000);
            })
        } else{
            $scope.modal.remove();
            $scope.crearModal();
        }
      });
    }

  });
