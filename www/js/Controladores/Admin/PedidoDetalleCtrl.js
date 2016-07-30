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
    mapaService
  ){

    $ionicLoading.show({
      template: 'Cargando<br><ion-spinner icon="lines" class="spinner-calm"></ion-spinner>'
    });

    var url = 'http://23.94.249.163/appDrinks/admin/detallePedido.php';

    $scope.pedido       = angular.fromJson($stateParams.pedido);
    $scope.pedido.fecha = new Date($scope.pedido.fecha);
    var idPedido        = $scope.pedido.id;
    $scope.mostrarMapa = false;
    $scope.claseBtn    = 'button button-balanced button-outline iconleft ion-chevron-down';

    /**
     * Obtener el detalle de un pedido
     *
     */
    $scope.getDetallePedido = function(){
      $http.post(url, {idPedido: idPedido}, {headers: { 'Content-Type': 'application/json'}})
        .then(function (data){
          angular.forEach(data.data, function(value) {
            $scope.dataCruda = value;
          });
          $scope.pedidoDetalle =[];
          angular.forEach($scope.dataCruda, function(valor, key) {
            $scope.pedidoDetalle.push({
              id:             $scope.pedido.id,
              producto:       valor.id_producto,
              pedido:         valor.id_pedido,
              cantidad:       valor.cantidad,
              subtotal:       valor.subtotal,
              nombreProducto: valor.nombre_producto,
              token:          valor.token
            });
          });
          $ionicLoading.hide();
          console.log( $scope.pedidoDetalle);
        });
    };

    $scope.getDetallePedido();


//modal
    $ionicModal.fromTemplateUrl('modal-estado.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });
    $scope.openModal = function() {
      $scope.modal.show();
    };
    $scope.closeModal = function() {
      $scope.modal.hide();
    };
    // Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hidden', function() {
      // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function() {
      // Execute action
    });


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
      mapaService.verMapa($scope.pedido.latitud, $scope.pedido.longitud);
    };

    /**
     *
     */
    $scope.enviarPushUsuario = function(titulo, contenido){
      $ionicLoading.show({
        template: 'Enviando notificación<br><ion-spinner icon="lines" class="spinner-calm"></ion-spinner>'
      });

      var mensaje = {
        'titulo':titulo,
        'contenido': contenido
      };

      NotificacionService.pushUsuario(mensaje, $scope.pedido.idDispositivo)
        .then(function(){
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
          $ionicLoading.hide();
          alert('Error al enviar notificaion al usuario');
        });

    };




  });
