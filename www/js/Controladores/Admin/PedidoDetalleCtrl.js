angular.module('starter')
  .controller('pedidoDetalleCtrl', function(
    $scope,
    $stateParams,
    $http,
    $ionicLoading,
    $ionicPopover,
    $state
  ){

   // $ionicLoading.show({
     // template: 'Cargando<br><ion-spinner icon="lines" class="spinner-calm"></ion-spinner>'
    //});

    var url = 'http://23.94.249.163/appDrinks/admin/listarPedidos.php';

    //var pedido = angular.fromJson($stateParams.pedido);
    console.log($state.params.pedido);


  });
