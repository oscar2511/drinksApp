angular.module('starter')
  .controller('pedidoDetalleCtrl', function(
    $scope,
    $stateParams,
    $http,
    $ionicLoading,
    $ionicPopover,
    $state,
    $ionicModal
  ){

    $ionicLoading.show({
      template: 'Cargando<br><ion-spinner icon="lines" class="spinner-calm"></ion-spinner>'
    });

    var url = 'http://23.94.249.163/appDrinks/admin/detallePedido.php';

    $scope.pedido = angular.fromJson($stateParams.pedido);
    console.log($scope.pedido);
    $scope.pedido.fecha = new Date($scope.pedido.fecha);
    var idPedido = $scope.pedido.id;

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
              nombreProducto: valor.nombre_producto
            });
          });
          console.log($scope.pedidoDetalle);
          $ionicLoading.hide();
        });
    };

    $scope.getDetallePedido();


//modal
    $ionicModal.fromTemplateUrl('my-modal.html', {
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




  });
