angular.module('starter')
  .controller('pedidoDetalleCtrl', function(
    $scope,
    $stateParams,
    $http,
    $ionicLoading,
    $ionicPopover,
    $state
  ){

    $ionicLoading.show({
      template: 'Cargando<br><ion-spinner icon="lines" class="spinner-calm"></ion-spinner>'
    });

    var url = 'http://23.94.249.163/appDrinks/admin/detallePedido.php';

    var pedido = angular.fromJson($stateParams.pedido);
    console.log(pedido);

    /**
     * Obtener el detalle de un pedido
     *
     */
    $scope.getDetallePedido = function(){
      $http.post(url, {headers: { 'Content-Type': 'application/json'}})
        .then(function (data){
          angular.forEach(data.data, function(value) {
            $scope.dataCruda = value;
          });
          $scope.pedido =[];
          angular.forEach($scope.dataCruda, function(valor, key) {
            $scope.pedido.push({
              id:            valor.id,
              producto:      valor.id_producto,
              pedido:        valor.id_pedido,
              cantidad:      valor.cantidad,
              subtotal:      valor.subtotal,
            });
          });
          console.log($scope.pedido);
          $ionicLoading.hide();
        });
    };

    $scope.getDetallePedido();


  });
